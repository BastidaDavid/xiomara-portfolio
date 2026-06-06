create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null,
  image_url text not null,
  project_url text,
  github_url text,
  technologies text[] not null default '{}',
  featured boolean not null default false,
  palette text[] not null default '{}',
  aspect_ratio numeric not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_category_check check (
    category in ('illustration', 'characters', 'branding', 'sketches', 'digital', 'concepts')
  ),
  constraint projects_aspect_ratio_check check (aspect_ratio > 0)
);

create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_featured_idx on public.projects (featured) where featured = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated admins can insert projects" on public.projects;
create policy "Authenticated admins can insert projects"
on public.projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update projects" on public.projects;
create policy "Authenticated admins can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete projects" on public.projects;
create policy "Authenticated admins can delete projects"
on public.projects
for delete
to authenticated
using (true);
