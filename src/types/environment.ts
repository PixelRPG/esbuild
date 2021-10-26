export interface Environment {
  production?: boolean;
  development?: boolean;
  watch?: boolean;
  outdir?: string;
  outfile?: string;
  serve?: boolean;
  port?: number;
}
