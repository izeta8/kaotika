import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Player } from "@/_common/interfaces/Player";
import React from 'react';
import PlayerInventorySellShop from '@/components/shop/sell/PlayerInventorySellShop';
import { mockPlayerData } from './__mocks__/MockPlayerData';




describe('PlayerInventorySellShop component tests', () => {

    const mockSetSelectedItemToSell = jest.fn();

    it('renders all inventory items correctly', () => {
        render(<PlayerInventorySellShop playerData={mockPlayerData} setSelectedItemToSell={mockSetSelectedItemToSell} />);

        // Check if inventory items are rendered
        expect(screen.getByAltText('Warbringer Helm')).toBeInTheDocument();
        expect(screen.getByAltText('Soulstealer')).toBeInTheDocument();
        expect(screen.getByAltText('Obsidian Plate')).toBeInTheDocument();
        expect(screen.getByAltText('Knights Shield')).toBeInTheDocument();
        expect(screen.getByAltText('Amulet of the Phoenix Rebirth')).toBeInTheDocument();
        expect(screen.getByAltText('Beggars path')).toBeInTheDocument();
        expect(screen.getByAltText('Ring of Eternal Flame')).toBeInTheDocument();
        expect(screen.getByAltText('Moonleaf')).toBeInTheDocument();
    });

    it('calls setSelectedItemToSell when an item is clicked', () => {
        render(<PlayerInventorySellShop playerData={mockPlayerData} setSelectedItemToSell={mockSetSelectedItemToSell} />);

        // Simulate a click on the helmet
        const helmetImage = screen.getByAltText('Warbringer Helm');
        fireEvent.click(helmetImage);

        // Check if the setSelectedItemToSell function is called with the correct item
        expect(mockSetSelectedItemToSell).toHaveBeenCalledWith(mockPlayerData.inventory.helmets[0]);
        expect(mockSetSelectedItemToSell).toHaveBeenCalledTimes(1);
    });

    
});

