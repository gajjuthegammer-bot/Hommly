import Banner_props from "../Blogs/Banner_props";
import Footer from "../Footer";
import Header from "../Header";
import Propertisdetail from "./Propertisdetail";


const Propertiesdetails = () => {
    return(
        <>
        <Header/>
        <Banner_props heading="Properties Details" />
        <Propertisdetail />
        <Footer/>
        </>
    )
}
export default Propertiesdetails;