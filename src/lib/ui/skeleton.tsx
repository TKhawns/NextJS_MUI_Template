import { Skeleton } from "@mui/material";

import { Box } from "@mui/material";

export function LoadingSkeleton() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				padding: 2,
				backgroundColor: "#f5f5f5",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					maxWidth: 600,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
					<Box sx={{ minWidth: 0 }}>
						<Skeleton
							variant="rectangular"
							width={160}
							height={20}
							sx={{ borderRadius: 1 }}
						/>
						<Skeleton
							variant="rectangular"
							width={48}
							height={16}
							sx={{ mt: 1, borderRadius: 1 }}
						/>
						<Skeleton
							variant="rectangular"
							width={48}
							height={16}
							sx={{ mt: 1, borderRadius: 1 }}
						/>
					</Box>
				</Box>
				<Skeleton
					variant="rectangular"
					width={48}
					height={16}
					sx={{ mt: 1, borderRadius: 1 }}
				/>
				<Skeleton
					variant="rectangular"
					width={48}
					height={16}
					sx={{ mt: 1, borderRadius: 1 }}
				/>
				<Skeleton
					variant="rectangular"
					width={48}
					height={16}
					sx={{ mt: 1, borderRadius: 1 }}
				/>
			</Box>
		</Box>
	);
}
