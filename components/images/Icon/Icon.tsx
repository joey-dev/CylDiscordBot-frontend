import React from 'react';
import styled from 'styled-components';
import nl from '../../../public/assets/icons/countryFlags/nl.svg';
import us from '../../../public/assets/icons/countryFlags/us.svg';
import utility from '../../../public/assets/icons/utility.svg';
import Image from 'next/image'


type StyledIconProps = {
    float?: 'left' | 'right';
    margin?: string;
    width: string;
};

const StyledIconWrapper = styled.div<StyledIconProps>`
    width: ${(props: StyledIconProps) => props.width};
    float: ${(props: StyledIconProps) => props.float};
    margin: ${(props: StyledIconProps) => props.margin};
`;

export type IIconName = 'utility' | 'us' | 'nl' | 'test';

type Props = {
    name: IIconName;
    float?: 'left' | 'right';
    margin?: string;
};

const Icon: React.FC<Props> = (props: Props) => {
    let icon;

    switch (props.name) {
        case 'utility':
            icon = utility;
            break;
        case 'nl':
            icon = nl;
            break;
        case 'us':
            icon = us;
            break;
    }

    return (
        <StyledIconWrapper
            width="25px"
            float={props.float}
            margin={props.margin}
        >
            <Image
                src={icon}
                alt="language image"
                width={25}
                height={25}
            />
        </StyledIconWrapper>
    );
};


export default Icon;
