import "./globals.css";
import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Header from "@/components/layout/Header";
import Toaster from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AI Language Practice",
	description: "Practice languages with AI-generated dialogues",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen bg-gray-50`}>
				<Header session={session} />
				<main className="container mx-auto px-4 py-8">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
