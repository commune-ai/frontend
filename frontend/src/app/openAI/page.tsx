"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/molecules/search-bar/search-bar";
import Modal from "antd/es/modal/Modal";
import OpenAIModuleItem from "@/components/molecules/openAI-item";
import axios from "axios";
import { Pagination } from 'antd';
import data from './data.json'

const PolkadotWalletButton = dynamic(
	() => import("@/components/atoms/polkadot-wallet-button"),
	{ ssr: false }
);

export default function () {
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;
	const [loadedModules, setLoadedModules] = useState<any[]>([]);
	const [displayedModules, setDisplayedModules] = useState<any[]>([]);
	const [filteredModules, setFilteredModules] = useState<any[]>([]);

	useEffect(() => {
		const filtered = searchString
			? loadedModules.filter((module) =>
				 module.description?.toLowerCase().includes(searchString.toLowerCase()) ||  module.url.toLowerCase().includes(searchString.toLowerCase())
			)
			: loadedModules;
		setFilteredModules(filtered);
		if (searchString) {
			setCurrentPage(1);
			updateDisplayedModules(filtered, 1);
		} else {
			updateDisplayedModules(filtered, currentPage);
		}
	}, [searchString, loadedModules]);

	async function getData() {
		// const response = await axios.get("http://127.0.0.1:8000/api/replicate/")
		
		setLoadedModules(data);
	 	updateDisplayedModules(data, currentPage);
	
	}

	useEffect(() => {	

		getData()

	}, []);

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
		updateDisplayedModules(filteredModules, page)
	}

	const updateDisplayedModules = (modules: any[], page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setDisplayedModules(modules.slice(startIndex, endIndex));
	};

	return (
		<>
			<main className="mt-[30px] mb-[10px] flex flex-col items-center justify-center my-auto mx-auto xl:w-[1400px] px-[20px] ">
			   <PolkadotWalletButton/>
				<SearchBar
					setSearchString={setSearchString}
					searchString={searchString}
				/>
				{displayedModules && displayedModules.length > 0 ? (
					<div className='mt-[40px] grid grid-cols-3 grid-rows-3 gap-[20px] w-[100%]'>
						{displayedModules.map((item, idx) => (
							<OpenAIModuleItem key={idx} data={item} />

						))}
					</div>
				) : (
					<span style={{ height: "800px" }}>Loading modules...</span>
				)}
			</main>
			<Pagination current={currentPage} total={filteredModules.length} defaultPageSize={16} showSizeChanger={false} onChange={handlePageChange} className="dark:text-white mx-auto" />;
		</>
	);
}
