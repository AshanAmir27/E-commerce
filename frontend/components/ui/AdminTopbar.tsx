import Image from "next/image";
export default function AdminTopbar() {
    return (
        <div className="bg-white p-4 rounded-md py-4">
            <div className="flex justify-between items-center">
                <input type="text" name="search" id="search" placeholder="Search" 
                className="border border-gray-300 rounded-xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"  />
                <div className="flex items-center gap-2 rounded-full bg-white border border-gray-300 w-10 h-10">
                    <Image src="/download.png" alt="profile" width={30} height={30} className="w-full h-full object-cover rounded-full" />
                </div>
            </div>
        </div>
    );
}