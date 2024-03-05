"use client";

interface SearchBarProps {
	setSearchString: (value: string) => void;
	searchString: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	setSearchString,
	searchString,
}) => {
	return (
		<section className="w-full my-auto mx-auto bg-gray-100 rounded-lg border-zinc-700 dark:bg-[#1e2022] dark:border-gray-100 border-solid shadow-md mb-4">
			<input
				type="text"
				className="shadow-xl p-[0.5rem] text-[gray] placeholder:text-[gray] w-full bg-transparent outline-none border-none text-[1.5rem] leading-[3rem]"
				value={searchString}
				onChange={({ target: { value } }) => setSearchString(value)}
				placeholder="Search for module"
			/>
		</section>
	);
};

export default SearchBar;
