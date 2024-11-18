import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";

const RevealWrapper = dynamic(
  () => import("next-reveal").then((mod) => mod.RevealWrapper),
  {
    ssr: false,
  }
);

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h2 {
    margin: 10px 0;
    font-size: 1.5rem;
    color: #0d3d29;
  }
  a {
    color: #4361ee;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #0d3d29;
    }
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  display: flex;
  background-color: #f0f0f0;
  height: 160px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  color: #4361ee;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    color: #0d3d29;
  }
`;

const SectionWrapper = styled.div`
  padding: 60px 0; /* Espacement généreux autour de la section */
  background-color: #f9f9f9; /* Couleur de fond douce pour contraster */
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <SectionWrapper>
        <Center>
          {mainCategories.map((cat) => (
            <CategoryWrapper key={cat.name}>
              <CategoryTitle>
                <h2>{cat.name}</h2>
                <div>
                  <Link href={"/category/" + cat._id}>Show all</Link>
                </div>
              </CategoryTitle>

              <CategoryGrid>
                {categoriesProducts[cat._id].map((p, index) => (
                  <RevealWrapper key={p._id} delay={index * 50}>
                    <ProductBox {...p} />
                  </RevealWrapper>
                ))}
                <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                  <ShowAllSquare href={"/category/" + cat._id}>
                    Show all
                  </ShowAllSquare>
                </RevealWrapper>
              </CategoryGrid>
            </CategoryWrapper>
          ))}
        </Center>
      </SectionWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find({ parent: null });
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString);
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: 1 },
    });
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
