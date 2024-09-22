<script lang="ts">
	import type { categorizedTopics } from '$types/Topic.type';

	export const { allTopics } = $$props as { allTopics: categorizedTopics };

	$: sideBarOpen = false;
	$: selectedTopic = Object.keys(allTopics)[0];

	$: selectedItems = [] as categorizedTopics[0];
</script>

<div class="FeedBuilder">
	<div class="FeedBuilder__top">
		<div class="FeedBuilder__sidebar {sideBarOpen ? 'FeedBuilder__sidebar--open' : ''}">
			<div class="FeedBuilder__Hamburger">
				<input type="checkbox" id="NavBarInput" on:change={() => (sideBarOpen = !sideBarOpen)} />
				<div class="hamButton">
					<label class="HamMenu" for="NavBarInput">
						<span class="span HL1" />
						<span class="span HL2" />
						<span class="span HL3" />
					</label>
				</div>
			</div>
			<input class="CrispInput" type="text" placeholder="Search for topics" />
			<ul>
				{#each Object.keys(allTopics) as category}
					<button
						class="CrispButton"
						data-type="ghost"
						on:click={() => (selectedTopic = category)}
						data-active={selectedTopic === category}
					>
						{category}
					</button>
				{/each}
			</ul>
		</div>
		<div class="FeedBuilder__feed">
			<h3 class="FeedBuilder__feed--title">{selectedTopic}</h3>
			<ul class="FeedBuilder__content">
				{#each allTopics[selectedTopic] as topic (topic.id)}
					<label>
						<div class="FeedBuilder__content--input">
							<input
								id={topic.xmlUrl}
								class="CrispInput"
								type="checkbox"
								value={topic}
								checked={selectedItems.some((item) => item.id === topic.id)}
								on:change={(e) => {
									// @ts-ignore
									if (e.target.checked) {
										// @ts-ignore
										selectedItems = [...selectedItems, topic];
									} else {
										// @ts-ignore
										selectedItems = selectedItems.filter((item) => item.id !== topic.id);
									}
								}}
							/>
						</div>
						<div class="FeedBuilder__content--box">
							<h4>
								{topic.title.length <= 0 ? topic.xmlUrl : topic.title}
							</h4>
							<p>
								{topic.desc}
							</p>
						</div>
					</label>
				{/each}
			</ul>
		</div>
	</div>
	<div class="FeedBuilder__bottom">
		<button class="CrispButton">
			<span>Save</span>
		</button>
	</div>
</div>

<style lang="scss">
	.FeedBuilder {
		overflow: hidden;
		position: relative;
		border-radius: 30px;
		@include box(900px, 600px);
		backdrop-filter: blur(10px);
		background-color: var(--modal-bg);
		border: 1px solid var(--secondary);

		display: grid;
		grid-template-rows: 1fr 50px;

		#NavBarInput,
		.hamButton {
			display: none;
		}

		.hamButton {
			@include respondAt(930px) {
				z-index: 1;
				width: auto;
				height: 20px;
				position: absolute;
				right: -40px;
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
						border-top: 2px solid var(--separator);
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

		@include respondAt(930px) {
			width: 100%;
		}

		&__top {
			display: grid;
			overflow: hidden;
			@include box(100%, 100%);
			grid-template-columns: 280px 1fr;

			@include respondAt(930px) {
				grid-template-columns: 1fr;
			}
		}

		&__bottom {
			padding: 0 15px;
			@include make-flex($align: flex-end);
			border-top: 1px solid var(--separator);
		}

		&__sidebar {
			gap: 10px;
			padding: 15px;
			overflow: auto;
			max-height: 100%;
			@include box(100%, auto);
			// backdrop-filter: blur(10px);
			@include make-flex($dir: column);
			border-right: 1px solid var(--separator);

			@include respondAt(930px) {
				overflow: unset;
				max-width: 280px;
				position: absolute;
				// transform: translateX(-100%);
				left: -280px;
				border-radius: 30px 0 0 30px;
				background-color: var(--secondary);
				transition: left 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
				&--open {
					// transform: translateX(0%);
					left: 0;
				}
			}

			.CrispInput {
				--crp-input-height: 35px;
				--crp-input-border: 1px solid var(--separator);
			}

			& > ul {
				overflow: auto;
				padding: 0 10px 0 0;
				list-style: none;
				@include box(100%, auto);

				.CrispButton {
					--crp-button-width: 100%;
					--crp-button-height: 34px;
					justify-content: flex-start;
				}
			}
		}

		&__feed {
			padding: 15px;
			overflow-y: auto;
			gap: 15px;
			@include make-flex($just: flex-start, $align: flex-start);

			&--title {
				font-size: 1.5rem;
				font-weight: 600;
				color: var(--text);
				width: 100%;
				padding-bottom: 5px;
				border-bottom: 1px solid var(--separator);
			}

			@include respondAt(930px) {
				padding: 30px 15px 15px;
			}
		}

		&__content {
			list-style: none;
			padding: 0;
			width: 100%;
			@include make-flex($dir: column);

			&--input {
				@include box();
				@include make-flex();
				.CrispInput {
					--crp-input-border: 1px solid var(--separator);
				}
			}

			&--box {
				padding-right: 15px;
				border-bottom: 1px solid var(--separator);
				& > p {
					color: var(--subText);
					padding: 0 0 10px 0;
				}
			}

			label {
				gap: 10px;
				padding: 10px 0px 0 10px;
				color: var(--text);
				@include box(100%, auto);
				background-color: var(--tertiary);

				display: grid;
				grid-template-columns: 40px 1fr;

				&:first-child {
					border-radius: 10px 10px 0 0;
				}

				&:last-child {
					border-radius: 0 0 10px 10px;
				}

				&:has(input:checked) {
					background-color: var(--secondary);
				}
			}
		}
	}
</style>
