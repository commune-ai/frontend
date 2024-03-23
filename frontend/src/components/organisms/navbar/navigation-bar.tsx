import { Fragment } from 'react'
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import classes from './navigation-bar.module.css';
import DiscordIcon from "@/components/atoms/discord-icon";
import GitHubIcon from "@/components/atoms/github-icon";
import TwitterIcon from "@/components/atoms/twitter-icon";
import ThemeToggler from "@/components/templates/theme-toggler";


const navigation = [
	{ name: '🚀Modules', href: '/modules', current: false },
	{ name: '⛓Telemetry', href: '/telemetry', current: false },
	// { name: '🥂ComChat', href: 'https://comchat.io/', current: false },
	// { name: '💻ComfyUILauncher', href: 'https://huggingface.co/spaces/subbytech/comfyui-launcher/', current: false },
	// { name: '💱Comwallet', href: 'https://comwallet.io/', current: false },
	// { name: 'Bittensor', href: '/bittensor', current: false },
	// { name: 'Staking', href: '/staking', current: false },
	{ name: '📚Docs', href: '/docs/introduction', current: false },
	{ name: '📄Whitepaper', href: 'https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf' },
]

const community = [
	{ name: 'Discord', href: 'https://discord.gg/communeai' },
	{ name: 'Twitter', href: 'https://twitter.com/communeaidotorg' },
	{ name: 'Github', href: 'https://github.com/commune-ai' },
]

// const userNavigation = [
// 	{ name: 'Profile', href: '/profile' },
// 	{ name: 'Settings', href: '#' },
// ]

// const items: MenuProps['items'] = [
// 	{
// 		key: '1',
// 		label: (
// 			<span rel="noopener noreferrer" className="flex items-center">
// 				Pay with Stripe
// 				<Image src={StripeImage} alt="stripeImage" width={24} height={24} className="rounded-md ml-auto" />
// 			</span>
// 		),
// 	},
// 	{
// 		key: '2',
// 		label: (
// 			<span rel="noopener noreferrer" className="flex items-center" >
// 				Pay with Wallet
// 				<Image src={MetaMaskImage} alt="MetaMaskImage" width={24} height={24} className="rounded-md ml-2" />
// 			</span>
// 		),
// 	},
// ]

export default function NavigationBar() {

	return (
		<>
			<div className="min-h-full">
				<Disclosure as="nav" className="dark:bg-gray-900 border-b-2 border-slate-500 shadow-md">
					{({ open }) => (
						<>
							<div className="mx-auto px-4 lg:px-8">
								<div className="flex h-16 items-center justify-between">
									<div className="flex items-center">
										<Link className={classes.brand} href="/">
											<Image
												style={{ width: "auto", height: "4rem", marginRight: "-0.25rem" }}
												src="/gif/logo/commune.gif"
												alt="Commune Logo"
												width={64}
												height={64}
											/>
										</Link>
										<div className="hidden xl:block">
											<div className="flex">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 lg:pl-4 md:text-xl')}
														aria-current={item.current ? 'page' : undefined}
													>
														<span className='flex items-center justify-center'>
															{item.name === 'Bittensor' && <Image src='/img/frontpage/bittensor.jpg' alt='bittensor' width={25} height={10} className='mr-1' />}
															{item.name === 'Staking' && <Image src='/img/frontpage/staking.jpg' alt='staking' width={25} height={10} className='mr-1 rounded-md' />}
															{item.name}
														</span>
													</a>
												))}
											</div>
										</div>
									</div>
									{/* <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Commune AI</span></h1> */}
									<div className="hidden md:block">
										<div className="flex items-center">
											<Menu as="div" className="flex relative ml-3">

												<Menu.Button className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-xl')} aria-haspopup="true" aria-expanded="false" role="button" >
													🔗Community
												</Menu.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-0 z-10 mt-8 w-39 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://discord.gg/communeai"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<span><DiscordIcon /></span>
																	<span className="ml-1 mr-2">Discord</span>
																</div>
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://twitter.com/communeaidotorg"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<TwitterIcon />
																	<span className="ml-1 mr-2">Twitter</span>
																</div>
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://github.com/commune-ai"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<GitHubIcon />
																	<span className="ml-1 mr-2">Github</span>
																</div>
															</Link>
														</Menu.Item>
													</Menu.Items>
												</Transition>

											</Menu>

											<Menu as="div" className="flex relative ml-3">
												
					

											</Menu>

											{/* <Dropdown menu={{ items, onClick }}>
												<Space>
													<button style={{ marginLeft: '0.35rem' }} className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-[18px]')}>💰Payment</button>
												</Space>
											</Dropdown> */}


											{/* <Menu as="div" className="mx-3">
												<div>
													<Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">Open user menu</span>
														<Image className="h-8 w-8 rounded-full bg-white" src={LogoImage} alt="" />
													</Menu.Button>
												</div>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-10 z-10 mt-2 w-39 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														{
															userNavigation.map((item) => (
																<Menu.Item key={item.name}>
																	{({ active }) => (
																		<a
																			href={item.href}
																			className={classNames(
																				active ? 'bg-gray-100' : '',
																				'block px-4 py-2 text-sm text-gray-700'
																			)}
																		>
																			{item.name}
																		</a>
																	)}
																</Menu.Item>
															))
														}
													</Menu.Items>
												</Transition>

											</Menu> */}

											{/* <div className={classes.themeTogglerWrapper} style={{ marginLeft: '0.1rem' }}> */}
											<ThemeToggler />
											{/* </div> */}
										</div>
									</div>
									<div className="flex xl:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button
											className="
												relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 
												text-gray-400 hover:text-[#25c2a0] focus:outline-none focus:ring-2 
												focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800
											"
										>
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
											) : (
												<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="xl:hidden">
								<div className="space-y-1 pb-3 pt-2 px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current ? 'bg-gray-900 text-white' : 'dark:text-white hover:text-[#25c2a0]',
												'block rounded-md px-3 py-2', classes.link
											)}
											aria-current={item.current ? 'page' : undefined}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
								<div className="border-t border-gray-700 pb-3 pt-4">
									<div className="flex items-center px-5">
									
										<div className={classNames(classes.themeTogglerWrapper, 'ml-auto')}>
											<ThemeToggler />
										</div>
									</div>
									<div className="mt-3 space-y-1 px-2">
										{community.map((item) => (
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												target='_blank'
												className="block rounded-md px-3 py-2 dark:text-white text-lg"
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			
		</>
	)
}
