<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	export let open = false;
	export let title: string;

	const disable = () => {
		open = false;
	};
</script>

{#if open}
	<!-- This example requires Tailwind CSS v2.0+ -->
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0" />

		<div class="fixed inset-0 overflow-hidden">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				transition:fade={{ duration: 500 }}
				on:click|self={disable}
				class="absolute inset-0 overflow-hidden bg-slate-600 bg-opacity-50"
			>
				<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
					<!--
						Slide-over panel, show/hide based on slide-over state.
			
						Entering: "transform transition ease-in-out duration-500 sm:duration-700"
						From: "translate-x-full"
						To: "translate-x-0"
						Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
						From: "translate-x-0"
						To: "translate-x-full"
					-->
					<div
						transition:fly={{ x: 200, duration: 500 }}
						class="pointer-events-auto w-screen max-w-2xl"
					>
						<div
							class="flex h-full flex-col overflow-y-scroll bg-slate-100 dark:bg-slate-900 py-6 shadow-xl"
						>
							<div class="px-4 sm:px-6">
								<div class="flex items-start justify-between">
									<h2 class="text-lg font-medium" id="slide-over-title">
										{title}
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											on:click={disable}
											class="rounded-md bg-white text-gray-900 dark:text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span class="sr-only">Close panel</span>
											<!-- Heroicon name: outline/x -->
											<svg
												class="h-6 w-6"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div class="relative mt-6 flex-1 px-4 sm:px-6">
								<!-- Replace with your content -->
								<slot />
								<!-- /End replace -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
