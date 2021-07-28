import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
    const shouldDisplayProductFlag = variant !== 'default'
  const shouldDisplaySalePrice = typeof salePrice === 'number'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isWithSalePrice={shouldDisplaySalePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {shouldDisplaySalePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        {shouldDisplayProductFlag && <ProductFlag variant={variant}>{getProductFlagText(variant)}</ProductFlag> }
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 25%;
  min-width: 320px;
  height: min-content;
  padding: 18px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
  text-decoration: ${({ isWithSalePrice }) => isWithSalePrice && 'line-through'};
  color: ${({ isWithSalePrice }) => isWithSalePrice && COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  margin-left: auto;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ProductFlag = styled.div`
  border-radius: 2px;
  padding: 8px;
  position: absolute;
  top: 12px;
  right: -4px;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${COLORS.white};
  text-transform: capitalize;
  background-color: ${getProductFlagColor};
`

function getProductFlagColor({ variant }) {
  switch (variant) {
    case 'on-sale':
      return COLORS.primary
    default:
      return COLORS.secondary
  }
}

function getProductFlagText(variant) {
  switch (variant) {
    case 'on-sale':
      return 'sale'
    default:
      return 'just released!'
  }
}

export default ShoeCard;
