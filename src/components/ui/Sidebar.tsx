import { Logo } from '../icons/Logo';
import { TwitterIcon } from '../icons/TwitterIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { SidebarItem } from './SidebarItem';

export function Sidebar() {
	return (
		<div className="h-screen w-72 border-r-2 border-gray-100 fixed bg-white pl-6 ">
			<div className="flex text-2xl pt-8 items-center ">
				<div className="pr-2 text-purple-600">
					<Logo />
				</div>
				Brainly
			</div>

			<div className="pt-8 pl-4">
				<SidebarItem icon={<TwitterIcon />} text="Twitter" />
				<SidebarItem icon={<YoutubeIcon />} text="Youtube" />
			</div>
		</div>
	);
}
