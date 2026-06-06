export type Language = "es" | "en";
export type Theme = "light" | "dark";

export type ProjectCategory =
  | "illustration"
  | "characters"
  | "branding"
  | "sketches"
  | "digital"
  | "concepts";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image_url: string;
  project_url: string | null;
  github_url: string | null;
  technologies: string[];
  featured: boolean;
  palette: string[];
  aspect_ratio: number;
  created_at: string;
  updated_at: string;
};

export type ProjectFormValues = {
  title: string;
  description: string;
  category: ProjectCategory;
  image_url: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: boolean;
  palette: string;
  aspect_ratio: string;
};
