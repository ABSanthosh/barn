import { render } from '@testing-library/svelte';
import Toast from './Toast.svelte';
import { describe, expect, it } from 'vitest';

describe('Toast Component', () => {
	it('renders the correct message', () => {
		/**
		 * Renders a Toast component with the specified props.
		 *
		 * @param {string} message - The message to be displayed in the Toast.
		 * @param {string} dir - The direction of the Toast. Can be 'top', 'bottom', 'left', or 'right'.
		 * @param {string} type - The type of the Toast. Can be 'default', 'success', 'warning', or 'error'.
		 * @param {number} timeout - The duration in milliseconds for which the Toast should be displayed.
		 * @param {string} id - The unique identifier for the Toast.
		 * @returns {HTMLElement} - The rendered Toast component.
		 */
		const { getByText } = render(Toast, {
			props: {
				message: 'Hello World',
				dir: 'bottom',
				type: 'default',
				timeout: 3000,
				id: 'toast-1'
			}
		});
		expect(getByText('Hello World')).toBeInTheDocument();
	});

	it('renders with different dir values', () => {
		const { container } = render(Toast, {
			props: {
				message: 'Test Message',
				dir: 'top',
				type: 'default',
				timeout: 3000,
				id: 'toast-2'
			}
		});
		expect(container.firstChild).toHaveAttribute('data-dir', 'top');
	});

	it('renders with different type values', () => {
		const { container } = render(Toast, {
			props: {
				message: 'Test Message',
				dir: 'bottom',
				type: 'success',
				timeout: 3000,
				id: 'toast-3'
			}
		});
		expect(container.firstChild).toHaveAttribute('data-type', 'success');
	});

	it('assigns the correct id', () => {
		const { container } = render(Toast, {
			props: {
				message: 'Test Message',
				dir: 'bottom',
				type: 'default',
				timeout: 3000,
				id: 'toast-5'
			}
		});
		expect(container.firstChild).toHaveAttribute('id', 'toast-5');
	});

	it('renders with default props', () => {
		const { container, getByText } = render(Toast, {
			props: {
				message: 'Default Props Message'
			}
		});
		expect(getByText('Default Props Message')).toBeInTheDocument();
		expect(container.firstChild).toHaveAttribute('data-dir', 'bottom');
		expect(container.firstChild).toHaveAttribute('data-type', 'default');
	});
});
