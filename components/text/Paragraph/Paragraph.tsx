import React from "react";
import styled from "styled-components";

type Size = "small" | "medium" | "large";
type SizeValue = "15px" | "20px" | "25px";

type StyledPProps = {
	onClick?: () => void;
	size: SizeValue;
	color?: string;
	css?: string;
}

const StyledParagraph = styled.p<StyledPProps>`
    font-size: ${(props: StyledPProps) => props.size};
    color: ${(props: StyledPProps) => props.color || "unset"};

    ${(props: StyledPProps) => props.css || ""};

    &:hover {
        cursor: ${(props: StyledPProps) => props.onClick ? "pointer" : "auto"};
    }
`;

type Props = {
	children?: React.ReactNode;
	onClick?: () => void;
	size?: Size
	css?: string;
	color?: string;
};

const Paragraph: React.FC<Props> = (props: Props) => {
	const size = props.size || "medium";

	let sizeValue: SizeValue;

	switch (size) {
		case "small":
			sizeValue = "15px";
			break;
		case "medium":
			sizeValue = "20px";
			break;
		case "large":
			sizeValue = "25px";
			break;
		default:
			throw new Error("paragraph size is not defined!");
	}

	return (
		<StyledParagraph
			onClick={props.onClick}
			size={sizeValue}
			color={props.color}
			css={props.css}
		>
			{props.children}
		</StyledParagraph>
	);
};

export default Paragraph;
