import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { mockPlayerData } from './__mocks__/MockPlayerData';
import ShopPlayerInfo from '@/components/shop/ShopPlayerInfo';




describe('ShopPlayerInfo component tests', () => {

    it('renders the player information correctly from the mockPlayerData', () => {
        render(<ShopPlayerInfo gold={mockPlayerData.gold} level={mockPlayerData.level} />);

        // Check if the gold value is rendered correctly
        expect(screen.getByText('1329')).toBeInTheDocument();
        // Check if the level value is rendered correctly
        expect(screen.getByText('13')).toBeInTheDocument();
    });

});
