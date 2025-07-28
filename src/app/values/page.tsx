export default function ValuesPage() {
  return (
    <div className="mx-auto w-full max-w-[1084px] px-4 py-8 md:px-0 md:py-16">
      <div className="md:grid md:grid-cols-12 md:gap-5">
        {/* One column gap at start - desktop only */}
        <div className="hidden md:block md:col-span-1" />
        
        {/* Headline - 1 column */}
        <div className="hidden md:block md:col-span-1">
          <h1 className="text-3xl font-semibold mb-12">
            Values
          </h1>
        </div>
        
        {/* Empty space for right alignment - 4 columns */}
        <div className="hidden md:block md:col-span-4" />
        
        {/* Content - 5 columns, right aligned */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                1. There is no greater good, do good today
              </h3>
              <p className="text-sm text-gray-600">
                All the worst crimes in the world have been done because 
                of someone justifying it as it&apos;s for the greater good.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                2. Give more than you take
              </h3>
              <p className="text-sm text-gray-600">
                This applies to business, freelancing, love and every 
                aspect of life. By doing this there&apos;s no way you cannot 
                succeed
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                3. There is no talent, everything is a skill
              </h3>
              <p className="text-sm text-gray-600">
                You can learn anything if you care enough and practice 
                hard enough
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                4. Have that dawg in you
              </h3>
              <p className="text-sm text-gray-600">
                You think you have a skill issue but you just ain&apos;t got that 
                dawg in you
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                5. See things as they are.
              </h3>
              <p className="text-sm text-gray-600">
                There is no need to dive deeper or find complex 
                reasoning. Face value meanings are great. Closure is 
                unnecessary
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-900 tracking-tight">
                6. Nobody is self-made
              </h3>
              <p className="text-sm text-gray-600">
                You were literally created by your parents and you owe 
                everything to your teachers, friends, family.
              </p>
            </div>
          </div>
        </div>

        {/* One column gap at end - desktop only */}
        <div className="hidden md:block md:col-span-1" />
      </div>
    </div>
  )
}