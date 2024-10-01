<script lang="ts">
	import { ROUTES } from '$data/routes';
	import clickOutside from '$directive/clickOutside';
	import { UserStore } from '$lib/Store/UserStore';

	import Logo from '$images/logo.webp';
	import { page } from '$app/stores';

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

	$: console.log($page.url.pathname);
</script>

<nav
	class="Sidebar"
	use:clickOutside
	class:open={navState || userProfileMenu}
	on:outclick={() => {
		// match media query 845px
		if (window.matchMedia('(max-width: 845px)').matches) closeSideBar();
	}}
>
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
			on:click={() => closeSideBar(true)}
			data-icon={String.fromCharCode(58828)}
		/>
	</div>
</nav>

<style lang="scss">
	.Sidebar {
		gap: 15px;
		max-height: 100vh;
		@include box(56px);
		overflow-x: hidden;
		@include make-flex();
		background-color: var(--modal-bg-noBlur);
		border-right: 2px solid var(--border);
		// padding: 20px 8px 10px 10px;
		padding: 8px;
		z-index: 1;
		transition: all 0.3s ease-in-out;

		@include respondAt(845px) {
			position: fixed;
			top: 0;
			left: 0;
		}

		&.open {
			gap: 30px;
			@include box(250px);
			padding: 40px 20px 15px 20px;

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
			@include make-flex($align: flex-start);
			@include box(100%, auto);

			.CrispMenu {
				// border-top: 1px solid #eaecf0;
				// border-bottom: 1px solid #eaecf0;

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
