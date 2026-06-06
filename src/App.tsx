import { type CSSProperties, type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { categoryLabels, skills, STORAGE_KEYS, translations } from "./lib/content";
import { seedProjects } from "./lib/seed-projects";
import { isSupabaseConfigured, supabase } from "./lib/supabase";
import type { Language, Project, ProjectCategory, ProjectFormValues, Theme } from "./lib/types";

const categories: Array<ProjectCategory | "all"> = [
  "all",
  "illustration",
  "characters",
  "branding",
  "sketches",
  "digital",
  "concepts",
];

const heroProjectTitles = ["Visual Exploration", "Royal Bunny", "Tea Boom Brand", "Color Study"];

const emptyForm: ProjectFormValues = {
  title: "",
  description: "",
  category: "illustration",
  image_url: "",
  project_url: "",
  github_url: "",
  technologies: "",
  featured: false,
  palette: "",
  aspect_ratio: "1",
};

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function projectToForm(project: Project): ProjectFormValues {
  return {
    title: project.title,
    description: project.description,
    category: project.category,
    image_url: project.image_url,
    project_url: project.project_url ?? "",
    github_url: project.github_url ?? "",
    technologies: project.technologies.join(", "),
    featured: project.featured,
    palette: project.palette.join(", "),
    aspect_ratio: String(project.aspect_ratio),
  };
}

function normalizeProject(row: Project): Project {
  return {
    ...row,
    technologies: row.technologies ?? [],
    palette: row.palette ?? [],
    aspect_ratio: Number(row.aspect_ratio || 1),
  };
}

function resolveAssetUrl(url: string) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!basePath || !url.startsWith("/assets/")) return url;
  return `${basePath}${url}`;
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem(STORAGE_KEYS.lang) as Language) || "es");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(STORAGE_KEYS.theme) as Theme) || "light");
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [paletteProject, setPaletteProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<ProjectFormValues>(emptyForm);
  const [route, setRoute] = useState(window.location.pathname);

  const copy = translations[lang];
  const isAdmin = Boolean(session);

  const loadProjects = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");

    const { data, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (projectsError) {
      setError(projectsError.message);
    } else {
      setProjects((data ?? []).map(normalizeProject));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEYS.lang, lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const featuredProjects = useMemo(() => {
    const selectedIds = new Set<string>();
    const selected = heroProjectTitles.reduce<Project[]>((heroProjects, title) => {
      const project = projects.find((candidate) => candidate.title === title);
      if (project && !selectedIds.has(project.id)) {
        selectedIds.add(project.id);
        heroProjects.push(project);
      }
      return heroProjects;
    }, []);

    if (selected.length >= 4) return selected;

    const fallback = projects.filter((project) => !selectedIds.has(project.id));
    return [...selected, ...fallback].slice(0, 4);
  }, [projects]);

  const visibleProjects = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects]
  );

  function navigate(path: string) {
    window.history.pushState({}, "", path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openNewProject() {
    setEditingProject(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEditProject(project: Project) {
    setEditingProject(project);
    setForm(projectToForm(project));
    setIsFormOpen(true);
  }

  async function handleSaveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !isAdmin) return;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      image_url: form.image_url.trim(),
      project_url: form.project_url.trim() || null,
      github_url: form.github_url.trim() || null,
      technologies: parseList(form.technologies),
      featured: form.featured,
      palette: parseList(form.palette),
      aspect_ratio: Number(form.aspect_ratio) || 1,
    };

    setLoading(true);
    setError("");

    const result = editingProject
      ? await supabase.from("projects").update(payload).eq("id", editingProject.id)
      : await supabase.from("projects").insert(payload);

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    setIsFormOpen(false);
    setEditingProject(null);
    setForm(emptyForm);
    await loadProjects();
  }

  async function handleDeleteProject(project: Project) {
    if (!supabase || !isAdmin) return;
    const confirmed = window.confirm(`Eliminar "${project.title}"?`);
    if (!confirmed) return;

    setLoading(true);
    setError("");
    const { error: deleteError } = await supabase.from("projects").delete().eq("id", project.id);

    if (deleteError) {
      setError(deleteError.message);
      setLoading(false);
      return;
    }

    await loadProjects();
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate("/");
  }

  if (route === "/login") {
    return (
      <LoginPage
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        session={session}
        navigate={navigate}
      />
    );
  }

  return (
    <>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#home">Xiomara Vázquez</a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#about">{copy.navAbout}</a>
          <a href="#work">{copy.navWork}</a>
          <a href="#contact">{copy.navContact}</a>
        </nav>
        <div className="controls" aria-label="Display controls">
          {isAdmin ? <span className="admin-indicator">{copy.adminMode}</span> : null}
          <div className="segmented" aria-label="Language selector">
            <button className={`control-button ${lang === "es" ? "active" : ""}`} type="button" onClick={() => setLang("es")}>ES</button>
            <button className={`control-button ${lang === "en" ? "active" : ""}`} type="button" onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="theme-toggle" type="button" aria-label="Toggle light and dark theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <span className="theme-icon" aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
            <span>{theme === "dark" ? "Light" : copy.theme}</span>
          </button>
          {isAdmin ? (
            <button className="admin-link" type="button" onClick={handleLogout}>{copy.logout}</button>
          ) : (
            <button className="admin-link" type="button" onClick={() => navigate("/login")}>{copy.login}</button>
          )}
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy reveal visible">
            <p className="role">{copy.heroRole}</p>
            <h1>Xiomara Vázquez</h1>
            <p className="hero-subtitle">{copy.heroSubtitle}</p>
          </div>

          <div className="hero-gallery reveal visible" aria-label="Featured artworks">
            {featuredProjects.map((project, index) => (
              <figure
                className={`hero-piece ${index === 0 ? "hero-piece-large" : ""} ${index === 3 ? "hero-piece-wide" : ""}`}
                key={project.id}
              >
                <img src={resolveAssetUrl(project.image_url)} alt={project.title} />
                {project.palette.length > 0 ? (
                  <button className="hero-palette palette-trigger" type="button" onClick={() => setPaletteProject(project)} aria-label={`${project.title} color palette and technique`}>
                    {project.palette.slice(0, 4).map((color) => <span key={color} style={{ "--swatch": color } as CSSProperties} />)}
                  </button>
                ) : null}
              </figure>
            ))}
          </div>
        </section>

        <section className="section split-section" id="about">
          <div className="section-heading reveal visible">
            <span className="section-index">01</span>
            <h2>{copy.aboutTitle}</h2>
          </div>
          <p className="lead reveal visible">{copy.aboutBody}</p>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading centered reveal visible">
            <span className="section-index">02</span>
            <h2>{copy.workTitle}</h2>
            <p>{copy.workSubtitle}</p>
          </div>

          <div className="filters reveal visible" aria-label="Work filters">
            {categories.map((category) => (
              <button
                className={`filter-button ${filter === category ? "active" : ""}`}
                key={category}
                type="button"
                onClick={() => setFilter(category)}
              >
                {categoryLabels[lang][category]}
              </button>
            ))}
          </div>

          {error ? <p className="status-message error">{error}</p> : null}
          {loading ? <p className="status-message">{copy.loading}</p> : null}
          {!loading && visibleProjects.length === 0 ? <p className="status-message">{copy.empty}</p> : null}

          <div className="gallery reveal visible" id="gallery" aria-live="polite">
            {visibleProjects.map((project, index) => (
              <figure className="art-card" style={{ "--ratio": project.aspect_ratio } as CSSProperties} key={project.id}>
                <div
                  className="art-card-button"
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setLightboxProject(project);
                    }
                  }}
                >
                  <img src={resolveAssetUrl(project.image_url)} alt={project.title} loading={index < 4 ? "eager" : "lazy"} />
                  <figcaption>
                    <div className="art-meta">
                      <strong>{project.title}</strong>
                      <span>{categoryLabels[lang][project.category]}</span>
                    </div>
                    {project.palette.length > 0 ? (
                      <button className="palette-strip palette-trigger" type="button" onClick={(event) => {
                        event.stopPropagation();
                        setPaletteProject(project);
                      }} aria-label={`${project.title} color palette and technique`}>
                        {project.palette.slice(0, 4).map((color) => <span key={color} style={{ "--swatch": color } as CSSProperties} />)}
                      </button>
                    ) : null}
                  </figcaption>
                </div>
                {isAdmin ? (
                  <div className="card-admin-actions">
                    <button type="button" onClick={() => openEditProject(project)}>{copy.edit}</button>
                    <button type="button" onClick={() => void handleDeleteProject(project)}>{copy.delete}</button>
                  </div>
                ) : null}
              </figure>
            ))}
          </div>
        </section>

        <section className="section collaboration">
          <div className="section-heading reveal visible">
            <span className="section-index">03</span>
            <h2>{copy.collabTitle}</h2>
          </div>
          <div className="collab-panel reveal visible">
            <p className="collab-label">{copy.collabLabel}</p>
            <p>{copy.collabBody}</p>
          </div>
        </section>

        <section className="section skills-section">
          <div className="section-heading reveal visible">
            <span className="section-index">04</span>
            <h2>{copy.skillsTitle}</h2>
          </div>
          <ul className="skills-list reveal visible" aria-label="Skills">
            {skills[lang].map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy reveal visible">
            <span className="section-index">05</span>
            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactSubtitle}</p>
          </div>
          <div className="contact-grid reveal visible">
            <a href="mailto:xiomaravazquezr@hotmail.com"><span>Email</span><strong>xiomaravazquezr@hotmail.com</strong></a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@xiomara.art</strong></a>
            <a href="https://behance.net/" target="_blank" rel="noreferrer"><span>Behance</span><strong>Xiomara Vázquez</strong></a>
            <div><span>{copy.locationLabel}</span><strong>{copy.location}</strong></div>
            <div><span>{copy.collabsLabel}</span><strong>{copy.collabs}</strong></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p><span>{copy.footerCollaboration}</span> <a href="https://bastidasystems.com/" target="_blank" rel="noreferrer">Bastida Systems</a></p>
        <p>© {new Date().getFullYear()} Xiomara Vázquez. <span>{copy.footerRights}</span></p>
      </footer>

      {isAdmin ? (
        <button className="floating-add" type="button" onClick={openNewProject} aria-label={copy.add}>+</button>
      ) : null}

      {lightboxProject ? <ProjectLightbox project={lightboxProject} copy={copy} onClose={() => setLightboxProject(null)} /> : null}
      {paletteProject ? <PaletteModal project={paletteProject} copy={copy} onClose={() => setPaletteProject(null)} /> : null}
      {isFormOpen ? (
        <ProjectForm
          copy={copy}
          form={form}
          setForm={setForm}
          onSubmit={handleSaveProject}
          onClose={() => setIsFormOpen(false)}
          isEditing={Boolean(editingProject)}
        />
      ) : null}
    </>
  );
}

function LoginPage({
  lang,
  setLang,
  theme,
  setTheme,
  session,
  navigate,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  session: Session | null;
  navigate: (path: string) => void;
}) {
  const copy = translations[lang];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate("/");
  }, [navigate, session]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError("Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.");
      return;
    }

    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    navigate("/");
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-top">
          <button className="admin-link" type="button" onClick={() => navigate("/")}>{copy.back}</button>
          <div className="controls">
            <div className="segmented" aria-label="Language selector">
              <button className={`control-button ${lang === "es" ? "active" : ""}`} type="button" onClick={() => setLang("es")}>ES</button>
              <button className={`control-button ${lang === "en" ? "active" : ""}`} type="button" onClick={() => setLang("en")}>EN</button>
            </div>
            <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <span className="theme-icon" aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
              <span>{theme === "dark" ? "Light" : copy.theme}</span>
            </button>
          </div>
        </div>
        <h1>{copy.loginTitle}</h1>
        <p>{copy.loginSubtitle}</p>
        <form className="admin-form" onSubmit={handleLogin}>
          <label>
            {copy.email}
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            {copy.password}
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error ? <p className="status-message error">{error}</p> : null}
          {!isSupabaseConfigured ? <p className="status-message error">Supabase no está configurado.</p> : null}
          <button className="form-submit" type="submit" disabled={loading}>{loading ? "..." : copy.signIn}</button>
        </form>
      </section>
    </main>
  );
}

function ProjectLightbox({ project, copy, onClose }: { project: Project; copy: Record<string, string>; onClose: () => void }) {
  return (
    <div className="lightbox open" aria-hidden="false" role="dialog" aria-label="Artwork preview" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <button className="lightbox-close" type="button" aria-label="Close preview" onClick={onClose}>×</button>
      <img src={resolveAssetUrl(project.image_url)} alt={project.title} />
      <div className="lightbox-caption">
        <span>{project.title}</span>
        <p>{project.description}</p>
        <div className="project-links">
          {project.project_url ? <a href={project.project_url} target="_blank" rel="noreferrer">{copy.projectUrl}</a> : null}
          {project.github_url ? <a href={project.github_url} target="_blank" rel="noreferrer">{copy.githubUrl}</a> : null}
        </div>
      </div>
    </div>
  );
}

function PaletteModal({ project, copy, onClose }: { project: Project; copy: Record<string, string>; onClose: () => void }) {
  return (
    <div className="palette-modal open" aria-hidden="false" role="dialog" aria-label="Color palette details" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <button className="palette-close" type="button" aria-label="Close palette details" onClick={onClose}>×</button>
      <div className="palette-panel" role="document">
        <p className="palette-kicker">{copy.paletteLabel}</p>
        <h3>{project.title}</h3>
        <div className="technique-block">
          <span>{copy.techniqueLabel}</span>
          <strong>{project.description}</strong>
        </div>
        <div>
          <span className="colors-label">{copy.colorsLabel}</span>
          <div className="color-detail-grid">
            {project.palette.map((color, index) => (
              <div className="color-detail" key={color}>
                <span className="color-chip" style={{ "--swatch": color } as CSSProperties} />
                <span className="color-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="color-code">{color.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({
  copy,
  form,
  setForm,
  onSubmit,
  onClose,
  isEditing,
}: {
  copy: Record<string, string>;
  form: ProjectFormValues;
  setForm: (form: ProjectFormValues) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  isEditing: boolean;
}) {
  return (
    <div className="form-modal open" role="dialog" aria-label={copy.save}>
      <form className="project-form admin-form" onSubmit={onSubmit}>
        <div className="form-heading">
          <h3>{isEditing ? copy.edit : copy.add}</h3>
          <button type="button" onClick={onClose}>×</button>
        </div>
        <label>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
        <label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
        <label>Category
          <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProjectCategory })}>
            {categories.filter((category) => category !== "all").map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>Image URL<input value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} required /></label>
        <label>Project URL<input value={form.project_url} onChange={(event) => setForm({ ...form, project_url: event.target.value })} /></label>
        <label>GitHub URL<input value={form.github_url} onChange={(event) => setForm({ ...form, github_url: event.target.value })} /></label>
        <label>Technologies<input value={form.technologies} onChange={(event) => setForm({ ...form, technologies: event.target.value })} placeholder="React, Supabase" /></label>
        <label>Palette<input value={form.palette} onChange={(event) => setForm({ ...form, palette: event.target.value })} placeholder="#57b8c8, #e6d4b1" /></label>
        <label>Aspect ratio<input value={form.aspect_ratio} onChange={(event) => setForm({ ...form, aspect_ratio: event.target.value })} inputMode="decimal" /></label>
        <label className="checkbox-label"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured</label>
        <div className="form-actions">
          <button type="button" onClick={onClose}>{copy.cancel}</button>
          <button className="form-submit" type="submit">{copy.save}</button>
        </div>
      </form>
    </div>
  );
}
