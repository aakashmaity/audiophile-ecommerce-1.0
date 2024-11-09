import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Box } from "../cart";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { Price } from "@/components/ProductBox";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const CalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Desc = styled.p`
  font-family: Inter, -apple-system, Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
`
const DescList = styled.ul`
  list-style: disc;
  font-family: Inter, -apple-system, Helvetica, Arial, sans-serif;
  li {
    margin-bottom: 10px;
    font-weight: 350;
    line-height: 20px;
  }
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  const description = product.description.split("*");
  console.log(description);

  return (
    <>
      <Header />
      <Center>
        <CalWrapper>
          <Box>
            <ProductImages images={product?.images} />
          </Box>
          <div>
            <h1>{product.title}</h1>
            <Desc>{description[0]}</Desc>
            <DescList>
              {description.map((desc, idx) =>
                idx !== 0 ? <li key={desc}>{desc}</li> : null
              )}
            </DescList>
            <PriceRow>
              <div>
                <Price>₹{product.price}</Price>
              </div>
              <div>
                <Button primary={1} onClick={() => addProduct(product._id)}>
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </CalWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
