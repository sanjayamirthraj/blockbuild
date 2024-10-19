import React from 'react';
import CodeBlock from './CodeBlock';

const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Base64Storage {
    // Define mappings for base64 values
    mapping(uint256 => string) public base64_0_animation;
    mapping(uint256 => string) public base64_1_background;
    mapping(uint256 => string) public base64_2_image;
    mapping(uint256 => string) public base64_3_name;
    mapping(uint256 => string) public base64_4_state;
    mapping(uint256 => string) public base64_5_nature;
    mapping(uint256 => string) public base64_6_element;
    mapping(uint256 => string) public base64_7_category;
    mapping(uint256 => string) public base64_8_poem;
    mapping(uint256 => string) public base64_9_svg_special;

    // Function to save a value in the base64_0_animation mapping at a specified index
    function saveanimm(uint256 index, string memory value) public {
        require(index < 109, "Index out of bounds");
        base64_0_animation[index] = value;
    }

    // Function to save values in multiple mappings at a specified index
    function saveimage(
        uint256 index,
        string memory background,
        string memory image,
        string memory name,
        string memory state,
        string memory nature,
        string memory element,
        string memory category,
        string memory poem
    ) public {
        require(index < 109, "Index out of bounds");
        base64_1_background[index] = background;
        base64_2_image[index] = image;
        base64_3_name[index] = name;
        // ... other assignments
    }
}
`;

const ContractCode: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl mb-2">Your Contract Code:</h2>
            <CodeBlock language="solidity" code={contractCode} />
        </div>
    );
};

export default ContractCode;