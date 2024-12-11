import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { mockPlayerData } from './__mocks__/MockPlayerData';
import SellPlayerInfo from '@/components/shop/sell/SellPlayerInfo';




describe('ShellPlayerInfo component tests', () => {

    it('renders the player information correctly from the mockPlayerData', () => {
        render(<SellPlayerInfo gold={mockPlayerData.gold} level={mockPlayerData.level} />);

        // Check if the gold value is rendered correctly
        expect(screen.getByText('1329')).toBeInTheDocument();
        // Check if the level value is rendered correctly
        expect(screen.getByText('13')).toBeInTheDocument();
    });

});
