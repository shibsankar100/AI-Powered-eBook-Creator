import React from "react";
import {
  Quote,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import { TESTIMONIALS } from "../../utils/data";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-white via-violet-50/20 to-white py-20 sm:py-24"
    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-200/30 blur-[110px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-purple-200/30 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/20 blur-[100px]" />
        <div className="absolute left-10 top-32 h-16 w-16 rounded-full border border-violet-200/50" />
        <div className="absolute right-10 top-24 h-10 w-10 rounded-full border border-purple-200/50" />
        <div className="absolute bottom-32 left-[8%] h-2 w-2 rounded-full bg-violet-400/50" />
        <div className="absolute right-[10%] bottom-24 h-2 w-2 rounded-full bg-purple-400/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-100
              bg-violet-50
              px-4
              py-2
            "
          >
            <Sparkles className="h-4 w-4 text-violet-600" />

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-violet-700">
              Testimonials
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Loved by Creators

            <span className="mt-1 block bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Everywhere
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            See why thousands of creators use our AI-powered platform
            to turn their ideas into beautiful ebooks.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
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
                hover:shadow-violet-100/50
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
                  opacity-60
                  transition-all
                  duration-700
                  group-hover:scale-150
                  group-hover:bg-violet-100
                "
              />


              <div
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-50
                  transition-all
                  duration-300
                  group-hover:rotate-3
                  group-hover:bg-violet-100
                "
              >
                <Quote className="h-5 w-5 text-violet-300" />
              </div>

              <div className="relative flex items-center gap-3">
                <div className="relative shrink-0">
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-gradient-to-br
                      from-violet-500
                      to-purple-600
                      opacity-0
                      blur-md
                      transition-opacity
                      duration-300
                      group-hover:opacity-50
                    "
                  />

                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="
                      relative
                      h-12
                      w-12
                      rounded-full
                      object-cover
                      ring-2
                      ring-white
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                    <CheckCircle2 className="h-4 w-4 fill-green-500 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {testimonial.author}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {testimonial.title}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="
                      h-4
                      w-4
                      fill-violet-500
                      text-violet-500
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                    style={{
                      transitionDelay: `${starIndex * 35}ms`,
                    }}
                  />
                ))}

                <span className="ml-2 text-xs font-semibold text-gray-400">
                  5.0
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-6 text-gray-600">
                "{testimonial.text}"
              </p>

              <div
                className="
                  absolute
                  -bottom-8
                  -right-8
                  h-20
                  w-20
                  rounded-full
                  border
                  border-violet-100
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:grid-cols-3">
            <div className="relative px-6 py-7 text-center">
              <div className="text-3xl font-extrabold text-gray-900">
                50K+
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Happy Creators
              </div>

              <div className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-500 sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:h-10 sm:w-px sm:-translate-y-1/2 sm:translate-x-0" />
            </div>
            <div className="relative px-6 py-7 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-extrabold text-gray-900">
                  4.9
                </span>

                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Average Rating
              </div>

              <div className="absolute bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-500 sm:bottom-auto sm:left-auto sm:right-0 sm:top-1/2 sm:h-10 sm:w-px sm:-translate-y-1/2 sm:translate-x-0" />
            </div>

            <div className="px-6 py-7 text-center">
              <div className="text-3xl font-extrabold text-gray-900">
                100K+
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Ebooks Created
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />

          <span>
            Trusted by creators, writers, students, and entrepreneurs
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200/70 to-transparent" />
    </section>
  );
};

export default Testimonials;