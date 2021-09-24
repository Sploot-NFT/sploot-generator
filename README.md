# sploot-generator
A generator for all the Sploot Metadata


to use:
1) clone the repo.

2) from the directory, run the generator.
```
$: node sploot-generator.js
```

3) the metadata file will appear in `./output`


## Notes

#### raw dna numbers
three types of dna rolls, based on affinities:
- standard:  `random(min,max)`
- advantaged:  `random(min,max)` or `random(min,max)`, whichever is higest.
- disadvantaged:  `random(min,max)` or `random(min,max)`, whichever is lowest.

#### affinities
three sets of affinity values
- standard:  `min:0, max:1`
- specialized:  `min:.3, max:1`
- unique:  `min:.6, max:1`

#### dna generation
each time a dna value is generated, we do it twice -- once with the affinity, once without.  whichever is higer is the one that gets used.  if an affinity is used, we add 1 to the final value.  so, a set of dna could look like this:

`[1.2587, 0.7924, 0.9760, 1.5724, 1.9225, 1.5256, 0.2454, 1.8257, 0.7525]`

the numbers above 1 are where the affinity was the higher number.

#### about dna
once we have the dna, we can base everything off there.  we'll round the float part for stats.  we can use the whole number as a "affinity color flag".  with just dna, we can actually mint the nfts, and everything else is derivable.

