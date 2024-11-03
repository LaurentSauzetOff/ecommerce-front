import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
/* import NewProducts from "@/components/NewProducts"; */

export default function HomePage({featuredProduct,newProducts}) {
  console.log("featuredProduct : ", featuredProduct)
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
     {/*  <NewProducts products={newProducts} /> */}
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '6727b8a5ea31669b395d0166';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
 /*  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10}); */
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      /* newProducts: JSON.parse(JSON.stringify(newProducts)), */
    },
  };
}




