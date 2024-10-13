<script lang="ts">
	import Header from '$components/Header/Header.svelte';

	const topics = [
		{
			title: 'iOS Development',
			description:
				'Stay updated on the latest trends, tools, and tutorials in iOS development. From Swift programming to app design, discover resources that will enhance your skills and keep your projects cutting-edge.'
		},
		{
			title: 'Books',
			description:
				"Explore book reviews, author interviews, and literary news. Whether you're a casual reader or a bibliophile, find recommendations and insights into the world of literature."
		},
		{
			title: 'Gaming',
			description:
				"Dive into the gaming universe with news on the latest releases, reviews, and trends. From indie games to AAA titles, discover what's new and exciting in the gaming world."
		},
		{
			title: 'Space',
			description:
				'Uncover the mysteries of the cosmos with news on space exploration, astronomical discoveries, and the latest missions from NASA and beyond. Feed your curiosity about the universe.'
		},
		{
			title: 'Business & Economy',
			description:
				'Stay informed about the latest developments in the business world, economic trends, and financial news. Get insights into market shifts and strategies that shape global commerce.'
		},
		{
			title: 'Cars',
			description:
				'Get the latest updates on automotive news, reviews, and innovations. From electric vehicles to classic cars, stay informed about the trends that drive the automotive industry.'
		},
		{
			title: 'Food',
			description:
				"Discover culinary trends, recipes, and food-related news. Whether you're a home cook or a foodie, find inspiration and information on everything delicious."
		},
		{
			title: 'DIY',
			description:
				'Explore creative DIY projects, tips, and tutorials. From home improvement to crafts, get inspired to create and personalize your living space with hands-on ideas.'
		},
		{
			title: 'UIUX',
			description:
				'Stay current with the latest in user interface and user experience design. Find insights, trends, and best practices to create engaging and effective digital products.'
		},
		{
			title: 'Beauty',
			description:
				'Explore the latest beauty trends, product reviews, and skincare tips. Discover expert advice and inspiration to enhance your beauty routine.'
		},
		{
			title: 'Interior Design',
			description:
				'Stay inspired with the latest trends in interior design, decor ideas, and expert tips. Transform your space with creative solutions and innovative designs.'
		},
		{
			title: 'Web Development',
			description:
				'Stay updated on web development trends, frameworks, and best practices. From front-end to back-end, discover resources that will enhance your web development skills.'
		},
		{
			title: 'Fashion',
			description:
				'Explore the latest fashion trends, style tips, and industry news. From runway highlights to street style, stay inspired by the world of fashion.'
		},
		{
			title: 'Movies',
			description:
				"Get the latest news on movie releases, reviews, and industry insights. From blockbusters to indie films, find out what's worth watching."
		},
		{
			title: 'Tech',
			description:
				'Stay informed about the latest technology trends, gadget releases, and innovations. Explore insights into how technology shapes our lives.'
		},
		{
			title: 'Architecture',
			description:
				'Discover inspiring architectural designs, trends, and news. Explore how architecture influences our environment and culture through innovative structures.'
		},
		{
			title: 'Android Development',
			description:
				'Keep up with the latest in Android development, from coding tutorials to app design. Enhance your skills and stay informed about the Android ecosystem.'
		},
		{
			title: 'Sports',
			description:
				'Stay updated on the latest sports news, scores, and player highlights. From major leagues to local events, get the inside scoop on your favorite sports.'
		},
		{
			title: 'Tennis',
			description:
				"Follow the latest in tennis news, player rankings, and tournament updates. Whether you're a fan or a player, stay engaged with the world of tennis."
		},
		{
			title: 'Television',
			description:
				"Catch up on the latest TV shows, reviews, and industry news. Discover what's trending and find recommendations for your next binge-watch."
		},
		{
			title: 'Photography',
			description:
				'Explore the world of photography with tips, techniques, and the latest trends. Find inspiration and resources to enhance your photography skills.'
		},
		{
			title: 'Android',
			description:
				'Stay informed about the latest Android news, updates, and app reviews. Discover how to maximize your Android experience with the latest tips and tools.'
		},
		{
			title: 'Cricket',
			description:
				'Get the latest updates on cricket matches, player stats, and news. Stay engaged with scores and highlights from around the cricketing world.'
		},
		{
			title: 'Music',
			description:
				'Explore the latest music releases, artist interviews, and industry news. Discover new sounds and trends in the ever-evolving music landscape.'
		},
		{
			title: 'Funny',
			description:
				'Brighten your day with the latest in humor, memes, and funny stories. Discover content that will make you laugh and lighten your mood.'
		},
		{
			title: 'News',
			description:
				'Stay informed with the latest headlines and breaking news from around the world. Get insights into current events and important issues.'
		},
		{
			title: 'Programming',
			description:
				"Dive into programming news, tutorials, and trends. Whether you're a novice or an expert, find resources to enhance your coding skills."
		},
		{
			title: 'Travel',
			description:
				'Explore travel destinations, tips, and inspiration. Discover the latest travel news and guides to help you plan your next adventure.'
		},
		{
			title: 'Apple',
			description:
				'Stay updated on the latest Apple news, product launches, and software updates. Explore insights into the world of Apple technology and innovation.'
		},
		{
			title: 'Football',
			description:
				'Get the latest updates on football matches, player stats, and news. Stay engaged with scores and highlights from leagues around the globe.'
		},
		{
			title: 'Personal Finance',
			description:
				'Stay informed about personal finance tips, investment strategies, and financial news. Discover ways to manage your money effectively and build wealth.'
		},
		{
			title: 'History',
			description:
				'Explore intriguing historical events, figures, and insights. Delve into the past and discover how history shapes our present and future.'
		},
		{
			title: 'Startups',
			description:
				'Stay updated on startup news, trends, and success stories. Discover insights into entrepreneurship and innovation in the startup ecosystem.'
		},
		{
			title: 'Science',
			description:
				'Stay informed about the latest scientific discoveries, research, and innovations. Explore the wonders of science and how it impacts our world.'
		}
	];
</script>

<Header />

<main class="HomePage">
	<section class="SplashWrapper">
		<div class="Splash">
			<h1>
				Stay Informed, <br />
				<span> Effortlessly </span>
			</h1>
			<p>
				Discover the latest news from trusted sources, all in one place. Get updates that matter to
				you, anytime, anywhere.
			</p>
		</div>
	</section>

	<section class="About">
		<div class="About__content" style="margin: 0 48px;">
			<h2>scroll on your own terms</h2>
			<p>
				In 2024, we work, play, collaborate, and.... scroll. Feeds and timelines decide what we we
				read, watch, and care about.
				<br />
				<br />
				But your *for you* page isn't really for you -- it's just the content that the company knows
				will keep you hooked.
				<br />
				<br />
				What if you curated your own news feed? You could fill it with things you actually care about,
				not just clickbait. real journalism, not whatever your racist high-school classmate shares. Learn
				something new, remember to stay active, keep tabs on what matters.
				<br />
				<br />
				Barn can help you do just that!
			</p>
		</div>
	</section>
	<section class="Topics">
		<div class="About__content" style="padding-top: 0;">
			<h2>Topics</h2>
			<p>
				We have a wide range of topics to choose from. You can select the topics you are interested
				in and we will provide you with the latest news on those topics.
			</p>
		</div>
		<div class="AboutGroup">
			{#each topics as topic}
				<div class="BentoCard">
					<h3>{topic.title}</h3>
					<p>{topic.description}</p>
				</div>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	:global(html) {
		overflow-y: auto;
		overflow-x: hidden;
	}
	:global(#app) {
		padding: 0 15px;
	}
	.HomePage {
		@include box();
		max-width: $maxWidth;
		@include make-flex($just: flex-start);
		.BentoCard {
			border-radius: 20px;
			background-color: var(--modal-bg-noBlur);
			border: 1px solid var(--secondary);
			box-shadow: var(--t-crp-box-shadow);

			margin-bottom: 20px;
			-webkit-column-break-inside: avoid;
			padding: 20px;
			transition: all 0.2s ease-in-out;

			h3 {
				font-size: 24px;
				margin: 0;
			}

			p {
				font-size: 18px;
				color: var(--subText);
			}
		}
	}

	.SplashWrapper {
		@include box(100%, 80vh);
		@include make-flex();

		.Splash {
			margin-top: 70px;
			height: 80%;
			border-radius: 20px;

			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			grid-template-columns: 1.2fr 1fr;
			background-image: url(/src/lib/images/Clouds5.jpg);

			gap: 20px;
			padding: 15px 50px 15px 50px;
			@include make-flex($align: flex-start);

			@include respondAt(646px) {
				padding: 15px 30px 15px 30px;
			}

			h1 {
				font-size: 50px;
				text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.236);
				margin-top: 0;
				line-height: 1.5;

				span {
					color: light-dark(#fbffb3, #494d00);
				}

				@include respondAt(646px) {
					font-size: 40px;
				}
			}

			& > p {
				width: 70%;
				font-size: 20px;
				color: #656746;

				@include respondAt(646px) {
					width: 100%;
				}
			}

			@include respondAt(1015px) {
				margin-top: 60px;
			}
		}
	}
	.AboutGroup {
		width: 100%;
		gap: 20px;
		column-gap: 20px;
		display: block;
		column-count: 3;
		width: 100%;
		margin-bottom: 80px;

		@include respondAt(1035px) {
			column-count: 2;
		}

		@include respondAt(600px) {
			column-count: 1;
		}
	}

	.About {
		width: 100vw;
		padding: 15px 0 50px 0;
		display: grid;
		grid-row: span 2;
		align-items: center;
		justify-content: center;
		background-color: var(--fullSection);
		margin: 40px 0;

		&__content {
			padding: 48px 0;
			height: auto;
			max-width: $maxWidth;
			// margin: 0 48px;
			h2 {
				font-size: 45px;
				font-weight: 600;
				margin: 30px 0;

				@include respondAt(540px) {
					font-size: 40px;
				}
			}

			p {
				font-size: 21px;
				max-width: 100%;
				line-height: 31px;

				@include respondAt(540px) {
					font-size: 20px;
				}
			}
		}
	}
</style>
