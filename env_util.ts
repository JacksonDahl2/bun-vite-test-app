declare module "bun" {
  interface Env {
    AWESOME: string,
    MONGO_CONNECT_STRING: string,
    BASE_URL: string 
  }
}