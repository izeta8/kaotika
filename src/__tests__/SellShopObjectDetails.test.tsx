import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { mockPlayerData } from './__mocks__/MockPlayerData';
import SellShopObjectDetails from '@/components/shop/sell/SellObjectDetails';
import { mockArmorData, mockArtifactData, mockBootData, mockHelmetData, mockIngredient1Data, mockIngredient2Data, mockRingData, mockShieldData, mockWeaponData } from './__mocks__/MockItemData';




describe('SellShopObjectDetails component tests', () => {


    const hoverItemToSell = jest.fn();
    const setSelectedItemToSell = jest.fn();


    it('renders the helmet information correctly from the mockHelmetData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockHelmetData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Charisma:' 'Dexterity:' 'Constitution:' 'Intelligence:' 'Strength:' 'Defense:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingCharisma = screen.getByRole('heading', { name: /charisma:/i });
        const headingDexterity = screen.getByRole('heading', { name: /dexterity:/i });
        const headingConstitution = screen.getByRole('heading', { name: /constitution:/i });
        const headingIntelligence = screen.getByRole('heading', { name: /intelligence:/i });
        const headingStrength = screen.getByRole('heading', { name: /strength:/i });
        const headingDefense = screen.getByRole('heading', { name: /defense:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const charismaValue = within(headingCharisma).getByText('1');
        const dexterityValue = within(headingDexterity).getByText('5');
        const constitutionValue = within(headingConstitution).getByText('6');
        const intelligenceValue = within(headingIntelligence).getByText('3');
        const strengthValue = within(headingStrength).getByText('5');
        const defenseValue = within(headingDefense).getByText('24');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Warbringer Helm")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 170")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 10")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Charisma:' and the <span> contains '1'
        expect(headingCharisma).toBeInTheDocument(); 
        expect(charismaValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Dexterity:' and the <span> contains '5'
        expect(headingDexterity).toBeInTheDocument(); 
        expect(dexterityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Constitution:' and the <span> contains '6'
        expect(headingConstitution).toBeInTheDocument(); 
        expect(constitutionValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '3'
        expect(headingIntelligence).toBeInTheDocument(); 
        expect(intelligenceValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Strength:' and the <span> contains '5'
        expect(headingStrength).toBeInTheDocument(); 
        expect(strengthValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Defense:' and the <span> contains '24'
        expect(headingDefense).toBeInTheDocument(); 
        expect(defenseValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Warbringer Helm")).toBeInTheDocument();
    });


    it('renders the weapon information correctly from the mockWeaponData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockWeaponData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Charisma:' 'Dexterity:' 'Insanity:' 'Intelligence:' 'Strength:' 'Defense:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingCharisma = screen.getByRole('heading', { name: /charisma:/i });
        const headingDexterity = screen.getByRole('heading', { name: /dexterity:/i });
        const headingInsanity = screen.getByRole('heading', { name: /insanity:/i });
        const headingIntelligence = screen.getByRole('heading', { name: /intelligence:/i });
        const headingStrength = screen.getByRole('heading', { name: /strength:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const charismaValue = within(headingCharisma).getByText('8');
        const dexterityValue = within(headingDexterity).getByText('2');
        const insanityValue = within(headingInsanity).getByText('12');
        const intelligenceValue = within(headingIntelligence).getByText('10');
        const strengthValue = within(headingStrength).getByText('-15');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Soulstealer")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 675")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 11")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Charisma:' and the <span> contains '8'
        expect(headingCharisma).toBeInTheDocument(); 
        expect(charismaValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Dexterity:' and the <span> contains '2'
        expect(headingDexterity).toBeInTheDocument(); 
        expect(dexterityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Insanity:' and the <span> contains '12'
        expect(headingInsanity).toBeInTheDocument(); 
        expect(insanityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '10'
        expect(headingIntelligence).toBeInTheDocument(); 
        expect(intelligenceValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Strength:' and the <span> contains '-15'
        expect(headingStrength).toBeInTheDocument(); 
        expect(strengthValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Soulstealer")).toBeInTheDocument();
    });

    it('renders the armor information correctly from the mockArmorData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockArmorData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Charisma:' 'Dexterity:' 'Intelligence:' 'Strength:' 'Defense:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingCharisma = screen.getByRole('heading', { name: /charisma:/i });
        const headingDexterity = screen.getByRole('heading', { name: /dexterity:/i });
        const headingIntelligence = screen.getByRole('heading', { name: /intelligence:/i });
        const headingStrength = screen.getByRole('heading', { name: /strength:/i });
        const headingDefense = screen.getByRole('heading', { name: /defense:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const charismaValue = within(headingCharisma).getByText('12');
        const dexterityValue = within(headingDexterity).getByText('10');
        const intelligenceValue = within(headingIntelligence).getByText('15');
        const strengthValue = within(headingStrength).getByText('-6');
        const defenseValue = within(headingDefense).getByText('60');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Obsidian Plate")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 540")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 10")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Charisma:' and the <span> contains '1'
        expect(headingCharisma).toBeInTheDocument(); 
        expect(charismaValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Dexterity:' and the <span> contains '5'
        expect(headingDexterity).toBeInTheDocument(); 
        expect(dexterityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '3'
        expect(headingIntelligence).toBeInTheDocument(); 
        expect(intelligenceValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Strength:' and the <span> contains '5'
        expect(headingStrength).toBeInTheDocument(); 
        expect(strengthValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Defense:' and the <span> contains '24'
        expect(headingDefense).toBeInTheDocument(); 
        expect(defenseValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Obsidian Plate")).toBeInTheDocument();
    });


    it('renders the shield information correctly from the mockShieldData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockShieldData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Dexterity:' 'Constitution:' 'Strength:' 'Defense:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingDexterity = screen.getByRole('heading', { name: /dexterity:/i });
        const headingConstitution = screen.getByRole('heading', { name: /constitution:/i });
        const headingStrength = screen.getByRole('heading', { name: /strength:/i });
        const headingDefense = screen.getByRole('heading', { name: /defense:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const dexterityValue = within(headingDexterity).getByText('2');
        const constitutionValue = within(headingConstitution).getByText('3');
        const strengthValue = within(headingStrength).getByText('5');
        const defenseValue = within(headingDefense).getByText('10');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Knights Shield")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 15")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 1")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Dexterity:' and the <span> contains '2'
        expect(headingDexterity).toBeInTheDocument(); 
        expect(dexterityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Constitution:' and the <span> contains '3'
        expect(headingConstitution).toBeInTheDocument(); 
        expect(constitutionValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Strength:' and the <span> contains '5'
        expect(headingStrength).toBeInTheDocument(); 
        expect(strengthValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Defense:' and the <span> contains '10'
        expect(headingDefense).toBeInTheDocument(); 
        expect(defenseValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Knights Shield")).toBeInTheDocument();
    });


    it('renders the artifact information correctly from the mockArtifactData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockArtifactData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Charisma:' 'Dexterity:' 'Intelligence:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingCharisma = screen.getByRole('heading', { name: /charisma:/i });
        const headingDexterity = screen.getByRole('heading', { name: /dexterity:/i });
        const headingIntelligence = screen.getByRole('heading', { name: /intelligence:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const charismaValue = within(headingCharisma).getByText('8');
        const dexterityValue = within(headingDexterity).getByText('2');
        const intelligenceValue = within(headingIntelligence).getByText('-2');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Amulet of the Phoenix Rebirth")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 5")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 1")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Charisma:' and the <span> contains '8'
        expect(headingCharisma).toBeInTheDocument(); 
        expect(charismaValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Dexterity:' and the <span> contains '2'
        expect(headingDexterity).toBeInTheDocument(); 
        expect(dexterityValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '-2'
        expect(headingIntelligence).toBeInTheDocument(); 
        expect(intelligenceValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Amulet of the Phoenix Rebirth")).toBeInTheDocument();
    });


    it('renders the boot information correctly from the mockBootData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockBootData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text  'Defense:' '
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingDefense = screen.getByRole('heading', { name: /defense:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const defenseValue = within(headingDefense).getByText('4');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Beggars path")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 5")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 1")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '-2'
        expect(headingDefense).toBeInTheDocument(); 
        expect(defenseValue).toBeInTheDocument();
      
        expect(screen.getByAltText("Beggars path")).toBeInTheDocument();
    });


    it('renders the ring information correctly from the mockRingData', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockRingData} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ************************************************************************************************************************
        // ************************************************************************************************************************
        // Find the <h2> element that contains the text 'Dexterity:' 'Constitution:' 'Strength:' 'Defense:'
        // ************************************************************************************************************************
        // ************************************************************************************************************************
        const headingIntelligence = screen.getByRole('heading', { name: /intelligence:/i });
        const headingStrength = screen.getByRole('heading', { name: /strength:/i });

        // ****************************************
        // ****************************************
        // Get the value of the <span> inside the <h2>
        // ****************************************
        // ****************************************
        const intelligenceValue = within(headingIntelligence).getByText('2');
        const strengthValue = within(headingStrength).getByText('2');


        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Ring of Eternal Flame")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 10")).toBeInTheDocument();
        // Check if the min level renders correctly
        expect(screen.getByText("Min level to use is 1")).toBeInTheDocument();

        // Check if the <h2> contains the text 'Intelligence:' and the <span> contains '2'
        expect(headingIntelligence).toBeInTheDocument(); 
        expect(intelligenceValue).toBeInTheDocument();
        // Check if the <h2> contains the text 'Strength:' and the <span> contains '2'
        expect(headingStrength).toBeInTheDocument(); 
        expect(strengthValue).toBeInTheDocument();
        
      
        expect(screen.getByAltText("Ring of Eternal Flame")).toBeInTheDocument();
    });


    it('renders the ingredient information correctly from the mockIngredientData with one effect', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockIngredient1Data} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Moonleaf")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 8")).toBeInTheDocument();

        // Check if the effects renders correctly
        expect(screen.getByText("Least Increase Hit Points")).toBeInTheDocument();
        
        expect(screen.getByAltText("Moonleaf")).toBeInTheDocument();
    });


    it('renders the ingredient information correctly from the mockIngredientData with more than one effect', () => {

        // Render the component with the mock data
        render(<SellShopObjectDetails item={mockIngredient2Data} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell} />);

        // ****************************************
        // ****************************************
        // Check if the values renders correctly
        // ****************************************
        // ****************************************

        // Check if the name renders correctly
        expect(screen.getByText("Titan's Blood")).toBeInTheDocument();
        // Check if the value renders correctly
        expect(screen.getByText("Item value is 175")).toBeInTheDocument();

        // Check if the effects renders correctly
        expect(screen.getByText("Restore Strength")).toBeInTheDocument();
        expect(screen.getByText("Lesser Increase Hit Points")).toBeInTheDocument();
        expect(screen.getByText("Greater Restore Constitution")).toBeInTheDocument();
        
        expect(screen.getByAltText("Titan's Blood")).toBeInTheDocument();
    });

});
