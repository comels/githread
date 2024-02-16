// Importation des modules nécessaires de NextAuth, des fournisseurs d'authentification et de Prisma
import NextAuth, { getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Configuration de NextAuth pour l'authentification
export const authOptions = {
  // Utilisation de PrismaAdapter pour intégrer NextAuth avec la base de données Prisma
  adapter: PrismaAdapter(prisma),
  // Configuration des fournisseurs d'authentification (Google et GitHub dans ce cas)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub.toString(),
          name: profile.name,
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  // Callbacks pour personnaliser le comportement de NextAuth, ici on ajoute l'ID utilisateur à la session
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Ajoute l'ID de l'utilisateur à l'objet session
      return session; // Retourne la session mise à jour
    },
  },
};

// Exportation de la configuration par défaut de NextAuth pour utilisation dans l'API route [...nextauth].js
export default NextAuth(authOptions);

// Fonction personnalisée pour récupérer la session d'authentification côté serveur, et pouvoir l'utiliser dans toute l'application
export const getAuthSession = () => {
  const session = getServerSession(authOptions); // Récupère la session en utilisant la configuration de NextAuth
  return session; // Retourne la session récupérée
};
