<script lang="ts">
	import { ROUTES } from '$data/routes';
	import clickOutside from '$directive/clickOutside';
	import { UserStore } from '$lib/Store/UserStore';

	import Logo from '$images/logo.webp';
	import { page } from '$app/stores';
	import { setTheme, theme } from '$lib/Store/ThemeStore';
	import { toggleSettings } from '$lib/Store/SettingStore';

	$: navState = false;
	$: userProfileMenu = false;
	$: collapsibleState = {
		...Object.fromEntries(
			ROUTES.filter((item) => item.children.length > 0).map((item) => [item.route, false])
		)
	} as Record<string, boolean>;

	const closeSideBar = (toggle: boolean = false) => {
		navState = toggle ? !navState : false;
		collapsibleState = {
			...collapsibleState,
			...Object.fromEntries(
				ROUTES.filter((item) => item.children.length > 0).map((item) => [item.route, false])
			)
		};
	};

	let themeToggle: HTMLButtonElement;
	const themeToggleTransition = async () => {
		if (
			!themeToggle ||
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			setTheme($theme === 'dark' ? 'light' : 'dark');
			return;
		}

		document
			.startViewTransition(async () => {
				setTheme($theme === 'dark' ? 'light' : 'dark');
			})
			.ready.then(() => {
				// https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/#what-is-the-grow-animation
				const { top, left, width, height } = themeToggle.getBoundingClientRect();
				const x = left + width / 2;
				const y = top + height / 2;
				const right = window.innerWidth - left;
				const bottom = window.innerHeight - top;
				const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
				const isDark = $theme !== 'dark';
				const clipPath = [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`
				];

				document.documentElement.animate(
					{
						clipPath: isDark ? clipPath.reverse() : clipPath
					},
					{
						duration: 500,
						easing: 'ease-in-out',
						pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
					}
				);
			});
	};
</script>

<nav
	class="Sidebar"
	use:clickOutside
	class:open={navState || userProfileMenu}
	on:outclick={() => {
		if (window.matchMedia('(max-width: 845px)').matches) closeSideBar();
	}}
>
	<div class="Sidebar__Hamburger">
		<input type="checkbox" id="NavBarInput" bind:checked={navState} />
		<div class="hamButton">
			<label class="HamMenu" for="NavBarInput">
				<span class="span HL1" />
				<span class="span HL2" />
				<span class="span HL3" />
			</label>
		</div>
	</div>
	<div class="Sidebar__logo Row--between gap-15">
		<a href="/">
			<img src={Logo} alt="logo" />
			<span> Barn </span>
		</a>
	</div>
	<ul class="Sidebar__menuList">
		{#each ROUTES as route}
			{#if route.children.length === 0}
				<a
					class="Sidebar__menuList--item CrispButton"
					href={route.route}
					data-type="ghost"
					class:active={route.route === $page.url.pathname ||
						route.alt?.some((alt) => alt === $page.url.pathname)}
					data-icon={String.fromCharCode(route.icon)}
					title={route.name}
				>
					<span>
						{route.name}
					</span>
				</a>
			{:else if route.children.length > 0}
				<details
					class="Sidebar__subMenu"
					open={collapsibleState[route.route]}
					title={!navState ? route.name : ''}
				>
					<!-- svelte-ignore missing-declaration -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<summary
						data-icon={String.fromCharCode(route.icon)}
						data-icon-after={String.fromCharCode(58831)}
						class:active={route.children.some((child) => child.route === $page.url.pathname) ||
							$page.url.pathname === route.route}
						on:click={(e) => {
							e.preventDefault();
							if (!navState) navState = true;
							collapsibleState[route.route] = !collapsibleState[route.route];
						}}
					>
						<span>
							{route.name}
						</span>
					</summary>
					<div class="Sidebar__subMenu--content">
						{#each route.children as child}
							<a
								href={child.route}
								class="Sidebar__menuList--item"
								class:active={$page.url.pathname === child.route}
							>
								<span>
									{child.name}
								</span>
							</a>
						{/each}
					</div>
				</details>
			{/if}
		{/each}
	</ul>

	<div class="Sidebar__bottom">
		<button
			class="Sidebar__settings CrispButton active"
			data-icon="settings"
			title="Settings"
			on:click={() => {
				toggleSettings();
			}}
		>
			<span> Settings </span>
		</button>

		<details
			data-no-marker
			use:clickOutside
			class="CrispMenu w-100"
			bind:open={userProfileMenu}
			on:outclick={() => (userProfileMenu = false)}
		>
			<summary>
				<div class="Sidebar__user">
					<span
						style="background-image: url('{$UserStore?.picture}'); background-size: cover; background-position: center;"
					/>
					<div class="Sidebar__bottom--col">
						<p title={$UserStore?.name}>{$UserStore?.name}</p>
						<span title={$UserStore?.email}>{$UserStore?.email}</span>
					</div>
				</div>
			</summary>
			<ul class="CrispMenu__content" data-direction="top" data-align="left">
				<form action="/auth?/logout" method="POST" class="w-100">
					<button
						tabindex="-1"
						type="submit"
						title="Logout"
						data-type="danger"
						class="CrispButton w-100"
					>
						Log out
					</button>
				</form>
			</ul>
		</details>

		<button
			class={`CrispButton Sidebar__toggle${navState || userProfileMenu ? '--active' : '--item'}`}
			bind:this={themeToggle}
			on:click={async () => await themeToggleTransition()}
			aria-label="Toggle theme"
			title="Toggle theme"
		>
			<svg viewBox="0 0 20 20" width="16px" height="16px" fill="currentColor">
				<!-- render both but change display css in theme.css to avoid flicker -->
				<path id="moon" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				<path
					id="sun"
					fill-rule="evenodd"
					d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<button
			class={`CrispButton Sidebar__toggle${navState || userProfileMenu ? '--active' : '--item'}`}
			on:click={() => closeSideBar(true)}
			data-icon={String.fromCharCode(58828)}
		/>
	</div>
</nav>

<style lang="scss">
	:root {
		&::view-transition-old(root),
		&::view-transition-new(root) {
			animation: none;
			mix-blend-mode: normal;
		}
	}
	.Sidebar {
		gap: 15px;
		max-height: 100vh;
		@include box(56px);
		overflow-x: hidden;
		@include make-flex();
		background-color: var(--header-bg);
		border-right: 2px solid var(--border);
		// padding: 20px 8px 10px 10px;
		padding: 8px;
		backdrop-filter: blur(10px);
		z-index: 1;
		transition: all 0.3s ease-in-out;

		@include respondAt(845px) {
			position: fixed;
			top: 0;
			left: 0;
		}

		&__Hamburger {
			#NavBarInput,
			.hamButton {
				display: none;
			}

			.hamButton {
				@include respondAt(650px) {
					z-index: 1;
					width: auto;
					height: 20px;
					position: absolute;
					right: -40px;
					top: 20px;
					@include make-flex();
					label {
						height: 100%;
						margin: unset;
						@include make-flex($just: space-around);
						cursor: pointer;
						span {
							width: 20px;
							display: block;
							transform-origin: 4px 0px;
							transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
							border-top: 2px solid var(--border);
							border-radius: 10px;
							&:first-child {
								transform-origin: 0% 0%;
							}
							&:nth-last-child(2) {
								transform-origin: 0% 100%;
							}
						}
					}
				}
			}

			#NavBarInput:checked ~ .hamButton > label > .span.HL1 {
				opacity: 1;
				transform: rotate(45deg) translate(3px, -4px);
			}
			#NavBarInput:checked ~ .hamButton > label > .span.HL2 {
				opacity: 0;
				transform: rotate(0deg) scale(0.2, 0.2);
			}
			#NavBarInput:checked ~ .hamButton > label > .span.HL3 {
				transform: rotate(-45deg) translate(4px, 0px);
			}
		}

		@include respondAt(650px) {
			overflow: unset;
			max-width: 250px;
			width: 100%;
			position: absolute;
			height: 100%;
			left: -250px;
			border-radius: 18px 0 0 18px;
			transition: left 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
		}

		&.open {
			@include respondAtOpp(650px) {
				gap: 30px;
				@include box(250px);
				padding: 40px 20px 15px 20px;
			}
			.Sidebar__menuList {
				padding-left: 6px;
				margin-left: -13px;
				scrollbar-gutter: stable;
				@include box(calc(100% + 15px), fit-content);
			}
			.Sidebar__user {
				padding: 7px 3px 7px 3px;
			}
			.Sidebar__bottom {
				.CrispMenu {
					--crp-menu-height: auto;
					border-top: 1px solid var(--border);
					border-bottom: 1px solid var(--border);
					& > summary {
						padding: 0px;
					}
				}
			}
			@include respondAt(650px) {
				left: 0;
				@include box();
			}
		}

		&__logo {
			@include box(100%, 38px);

			& > a {
				gap: 10px;
				@include box();
				text-decoration: none;
				@include make-flex($just: flex-start, $dir: row);

				& > span {
					font-size: 30px;
					user-select: none;
					font-family: 'Ubuntu', sans-serif;
				}

				& > img {
					@include box(38px, 38px);
					// object-fit: contain;
					aspect-ratio: 1;
				}
			}
		}

		&__menuList {
			gap: 10px;
			flex-grow: 1;
			direction: rtl;
			overflow-y: auto;
			overflow-x: hidden;
			@include box(100%, fit-content);
			@include make-flex($just: flex-start, $dir: column);

			& > * {
				direction: ltr;
			}

			&--item,
			summary {
				gap: 8px;
				flex-shrink: 0;
				cursor: pointer;
				padding: 0px 8px;
				overflow: hidden;
				color: var(--text);
				border-radius: 7px;
				position: relative;
				line-height: normal;
				white-space: nowrap;
				text-decoration: none;
				background-color: transparent;
				border: 1px solid transparent;
				@include box(calc(100% - 2px), 35px);
				@include make-flex($dir: row, $just: flex-start);

				transition:
					color 0.15s ease-in-out,
					background-color 0.15s ease-in-out;

				& > span {
					color: inherit;
					transition: inherit;
				}

				&.active {
					color: var(--text);
					border: 1.2px solid var(--separator);
					background-color: var(--t-crp-disabled-background-color);
					&::before {
						color: var(--text);
					}
				}

				&:not(&.active) {
					&::before {
						transition: inherit;
					}
					&:hover,
					&:focus {
						transition: inherit;
						border: 1.2px solid var(--separator);

						&::before {
							color: var(--text);
						}
						& > span {
							color: var(--text);
						}
					}
				}
			}
		}

		&__settings {
			@include box(100%, 37px);
			@include make-flex($just: flex-start, $dir: row);
			padding: 0px 9px;
			overflow: hidden;
			line-height: normal;
			flex-shrink: 0;

			white-space: nowrap;
		}

		&__toggle {
			&::before {
				transition: transform 0.3s;
			}

			&--active,
			&--item {
				outline: none;
				cursor: pointer;
				border-radius: 5px;
				@include make-flex();
				@include box(100%, 37px);
			}

			&--active {
				align-items: flex-end !important;
				padding-right: 10px;
				&::before {
					transform: rotate(180deg);
				}
			}
		}

		&__subMenu {
			@include box(100%, auto);

			&[open] {
				summary {
					&::after {
						transform: rotate(0deg);
					}
				}
			}

			& > summary {
				list-style: none;
				&::after {
					transition: transform 0.2s ease-in-out;
					transform: rotate(-90deg);
					margin-left: auto;
				}
				&::-webkit-details-marker {
					display: none;
				}
			}

			&--content {
				gap: 8px;
				padding: 8px;
				margin-top: 10px;
				border-radius: 7px;
				white-space: nowrap;
				@include make-flex();
				@include box(100%, auto);
				border: 1px solid #3440543b;
			}
		}

		&__user {
			gap: 10px;
			display: grid;
			align-items: end;
			padding: 10px 3px 10px 1px;
			@include box($height: auto);
			grid-template-columns: 37px 1fr;
			transition: all 0.3s ease-in-out;

			& > span {
				margin: auto;
				border-radius: 50%;
				font-weight: bolder;
				@include make-flex();
				@include box(35px, 35px);
			}
		}

		&__bottom {
			gap: 10px;
			@include make-flex();
			@include box(100%, auto);

			.CrispMenu {
				// border-top: 1px solid #eaecf0;
				// border-bottom: 1px solid #eaecf0;
				align-self: flex-start;

				--crp-menu-height: 50px;
				--crp-menu-box-shadow: none;
				--crp-menu-background-color: transparent;
				--crp-menu-border: 1px solid transparent;
				--crp-menu-border-hover: 1px solid transparent;

				--crp-menu-content-width: 100%;

				& > summary {
					--crp-menu-summary-padding: 0;
				}
			}

			&--col {
				overflow: hidden;
				@include make-flex($align: flex-start);

				span,
				p {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				p {
					font-size: 14px;
					font-weight: 500;
				}
				span {
					color: var(--text);
					font-size: 12px;
				}
			}
		}
	}
</style>
