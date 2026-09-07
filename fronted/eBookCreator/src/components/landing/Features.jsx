import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FEATURES } from "../../utils/data";

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-50/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-violet-600" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="mt-1 block bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Create Your Ebook
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Everything you need to write, design, organize, and publish
            beautiful ebooks — all in one simple and powerful platform.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-violet-200
                  hover:shadow-2xl
                  hover:shadow-violet-100/60
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-1
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-violet-500
                    to-purple-600
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-violet-50
                    opacity-70
                    transition-all
                    duration-700
                    group-hover:scale-150
                    group-hover:bg-violet-100
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-32
                    w-32
                    rounded-full
                    bg-purple-50
                    opacity-0
                    blur-2xl
                    transition-all
                    duration-700
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${feature.gradient}
                      shadow-lg
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div
                    className={`
                      absolute
                      left-1/2
                      top-1/2
                      -z-10
                      h-14
                      w-14
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-2xl
                      bg-gradient-to-br
                      ${feature.gradient}
                      opacity-0
                      blur-xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-40
                    `}
                  />
                </div>

                <div className="relative mt-6">

                  <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-violet-700">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                    {feature.description}
                  </p>
                </div>


                <div
                  className="
                    absolute
                    -bottom-10
                    -right-10
                    h-24
                    w-24
                    rounded-full
                    border
                    border-violet-100
                    transition-all
                    duration-500
                    group-hover:scale-150
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-6
                    -right-6
                    h-12
                    w-12
                    rounded-full
                    border
                    border-violet-100
                    transition-all
                    duration-500
                    group-hover:scale-150
                  "
                />
              </div>
            );
          })}
        </div>
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-9 text-center shadow-xl shadow-violet-200 sm:px-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Create Your Ebook?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
              Turn your ideas into a professional ebook with the power of AI.
            </p>
            <a
              href="/signup"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3
                text-sm
                font-bold
                text-violet-700
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-gray-50
                hover:shadow-xl
              "
            >
              <span>Start Creating Today</span>

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;