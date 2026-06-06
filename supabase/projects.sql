create extension if not exists pgcrypto;

create table if not exists public.portfolio_projects (
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

create index if not exists portfolio_projects_created_at_idx on public.portfolio_projects (created_at desc);
create index if not exists portfolio_projects_category_idx on public.portfolio_projects (category);
create index if not exists portfolio_projects_featured_idx on public.portfolio_projects (featured) where featured = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_projects_set_updated_at on public.portfolio_projects;
create trigger portfolio_projects_set_updated_at
before update on public.portfolio_projects
for each row execute function public.set_updated_at();

alter table public.portfolio_projects enable row level security;

drop policy if exists "Public can read projects" on public.portfolio_projects;
create policy "Public can read projects"
on public.portfolio_projects
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated admins can insert projects" on public.portfolio_projects;
create policy "Authenticated admins can insert projects"
on public.portfolio_projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admins can update projects" on public.portfolio_projects;
create policy "Authenticated admins can update projects"
on public.portfolio_projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admins can delete projects" on public.portfolio_projects;
create policy "Authenticated admins can delete projects"
on public.portfolio_projects
for delete
to authenticated
using (true);
