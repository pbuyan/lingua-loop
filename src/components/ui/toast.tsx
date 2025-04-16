"use client";

import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

// const Toaster = () => (
// 	<Toast.Provider>
// 		<Toast.Root>
// 			<Toast.Title />
// 			<Toast.Description />
// 			<Toast.Action />
// 			<Toast.Close />
// 		</Toast.Root>

// 		<Toast.Viewport />
// 	</Toast.Provider>
// );

// export default Toaster;

// Toaster;
const Toaster = () => {
	const [open, setOpen] = useState(false);

	return (
		<Toast.Provider swipeDirection="right">
			{/* Trigger button to show the toast */}
			<button type="button" onClick={() => setOpen(true)}>
				Show Toast
			</button>

			{/* The Toast component */}
			<Toast.Root
				open={open}
				onOpenChange={setOpen} // Controlled component: toggles open/close state
				duration={5000} // Auto-dismiss after 5000ms
				style={{
					backgroundColor: "white",
					border: "1px solid #ccc",
					padding: "16px",
					borderRadius: "4px",
				}}
			>
				<Toast.Title>Action Completed</Toast.Title>
				<Toast.Description>Your action was successful!</Toast.Description>
				{/* A custom action button inside the toast */}
				<Toast.Action asChild altText="Close">
					<button type="button" onClick={() => setOpen(false)}>
						Close
					</button>
				</Toast.Action>
			</Toast.Root>

			{/* Container that holds toast notifications */}
			<Toast.Viewport
				style={{
					position: "fixed",
					bottom: "16px",
					right: "16px",
					width: "320px",
				}}
			/>
		</Toast.Provider>
	);
};

export default Toaster;
