import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface UserProfileProps {
	user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
	const [name, setName] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	const updateProfile = async () => {
		try {
			setLoading(true);

			// Update user metadata
			const { error } = await supabase.auth.updateUser({
				data: { name },
			});

			if (error) throw error;

			setMessage("Profile updated successfully!");
			setTimeout(() => setMessage(null), 3000);
		} catch (error) {
			console.error("Error updating profile:", error);
			setMessage("Error updating profile");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h2 className="text-xl font-semibold mb-4">Your Profile</h2>

			{message && (
				<div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded">
					{message}
				</div>
			)}

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1" htmlFor="email">
						Email
					</label>
					<Input name="email" value={user.email} disabled />
				</div>

				<div>
					<label className="block text-sm font-medium mb-1" htmlFor="name">
						Display Name
					</label>
					<Input
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
					/>
				</div>

				<Button onClick={updateProfile} disabled={loading}>
					{loading ? "Saving..." : "Save Profile"}
				</Button>
			</div>
		</div>
	);
}
