import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

interface HeaderProps {
	session: Session | null;
}

export default function Header({ session }: HeaderProps) {
	return (
		<header className="bg-white shadow">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link href="/" className="text-xl font-bold text-blue-600">
					LinguaDialog
				</Link>

				<nav className="flex items-center gap-6">
					<Link href="/dashboard" className="hover:text-blue-600">
						Practice
					</Link>

					{session ? (
						<>
							<Link href="/favorites" className="hover:text-blue-600">
								Favorites
							</Link>
							<form action="/auth/sign-out" method="post">
								<Button variant="outline" size="sm" type="submit">
									Sign Out
								</Button>
							</form>
						</>
					) : (
						<Link href="/auth/sign-in">
							<Button variant="outline" size="sm">
								Sign In
							</Button>
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}
