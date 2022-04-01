export const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  google: {
    host: "https://accounts.google.com/o/oauth2/v2/auth",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    access_type: "offline",
    response_type: "code",
    state: "state_parameter_passthrough_value",
    client_id: process.env.GG_CLIENT_ID,
    redirect_uri: process.env.GG_REDIRECT_URI,
    client_secret: process.env.GG_CLIENT_SECRET,
  },
};
