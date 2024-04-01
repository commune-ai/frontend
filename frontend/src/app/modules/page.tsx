import Modules from "./modules";
import { PolkadotProvider } from "@/context";

const ModulePage = () => {

	return (
		<>
			<PolkadotProvider wsEndpoint={String(process.env.NEXT_PUBLIC_COMMUNE_API)}>
				<Modules />
			</PolkadotProvider>
		</>
	);
}

export default ModulePage;
