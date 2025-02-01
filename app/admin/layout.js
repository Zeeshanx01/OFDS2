

import Sidebar from "./components/Sidebar";

export const metadata = {
    title: "Admin | OFDS",
    description: "Admin: Online Food Delivery System",
};

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="flex gap-2" >
            

                    <Sidebar />


                {children}


            </div>
        </>

    );
}
