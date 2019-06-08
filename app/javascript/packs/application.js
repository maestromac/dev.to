if (window.lazyChunks.Chat) {
	import(
		/* webpackMode: "lazy" */
		/* webpackChunkName: "chat" */
		'../chat/index.jsx'
	);
}

if (window.lazyChunks.Search) {
  import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "search" */
    '../src/components/Search/main.jsx'
  );
}

if (window.lazyChunks.Onboarding) {
	import(
		/* webpackMode: "lazy" */
		/* webpackChunkName: "onboarding" */
		'../src/main.jsx'
	);
}

if (window.lazyChunks.sidebarWidget) {
  import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "sidebarWidget" */
    '../sidebar-widget/index.jsx'
  );
}
