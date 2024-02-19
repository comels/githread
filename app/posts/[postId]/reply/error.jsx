"use client"; // Error components must be Client Components

const Error = () => {
  return (
    <div>
      <div class="mx-auto flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow">
        <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span class="sr-only">Warning icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">
          Connectez vous pour répondre à un post.
        </div>
      </div>
    </div>
  );
};

export default Error;
