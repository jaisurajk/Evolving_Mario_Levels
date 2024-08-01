# Evolving_Mario_Levels

## Members: Jaisuraj Kaleeswaran and Jimmy Luu

### Modified mutate() function in the Individual Grid class

- We created several functions in the mutate() function, each of which does a specific task.
- generate_floor_holes() generate approximately 10 holes for every 100 floor tiles that are visible while the level is played.
- clean_map() replaces "|", "T", and "E" with "-". Each "-" represents a part of a clear sky.
- assign_random_tiles() assigns tiles according to the values of the length, width, and height
- fixed_misplaced_tiles() modifies any misplaced tiles created from the assign_random_tiles() function
- cleanup_special_blocks() removes blocks like "M" and "?" from the level and replaces them with a "-" which shows that the sky is clear at the position where the special blocks were
- introduce_enemies() spawns enemy characters for each cell in the game that generates a random integer less than 1, if these cells are empty, and if the cell below these cells is not empty.
- clean_left_column() replaces the leftmost column of the game with "-"
- The mutation rate in this function random.random() > 0.98 so that ther is a 2% chance of mutation to occur.

### Modified generate_successors()

- In generate_successors thw two strategies that we used were elitist selection and parent pool selection. For elitist selection we chose this becuase of how the function is able
- to preserves a subset of the best individuals from the current population. It determines how many of the the top individuals are preserved and ensures that the best traits 
- from the current population are carried over to the next generation. For the parent pool selection, originally we were going to try to use tournament selection, but it kept giving us errors
- so we tried this method. Parent pool selects a subset of the top individuals to act as parents for generating new children. The parent_pool will be used to generate new offspring 
- by pairing different parents and this will allow the the offspring to inherit and combine traits from the best individuals.

### Modified generate_children() in the Individual Grid class

- In generate_children() we implemented a uniform crossover for the grid-based genome. This method iterates over each row of the level grid, 
- randomly choosing whether to take the tile data from the current individual or the other parent. After constructing the new genome through this 
- crossover process, the method then applies mutation to this genome to introduce variability. This mutation will alter the tile placements according to the
- predefined constraints and rules. The result from this will be the newly created instance which will be the child of the two parents. We chose this approach to ensure
- that each child inherits stuff from both of the parents while also incorporating some level of random mutation.

### Modified calculate_fitness() in the Infividual DE class

- The only thing that we improved on in the calculate_fitness() function is adding more penalizations such as excessive coins, enemies, platforms, and pipes. We added these to not
- over-cluttter the levels as much. Befor adding these there was just too much on the game screen.

### generate_children() in the Individual DE class

- The generate_children() in the Individual DE class is to create two new "child" genomes by perfroming crossover between two parent genomes. The function begins by
- selecting random crossover points pa and pb within the genomes and then combines the segments from each parent to generate two offspring: one child called ga and gb. 
- ga takes the initial segment from the first parent up to pa and appends the remainder of the second parent's genome starting from pb. gb works the same way as ga but 
- pa and pb are switched. When those two genomes are created, each child will be mutated and the result from all of this is two new genomes in Individual_DE.

### Playing our two favorite levels

- Each level took 10 generations, and each generation took around 4-6 seconds.
- Our first favorite level took approximately 51 seconds and our second one took approximately 53 seconds
- The first level was challenging due to some annoying obstacles, but these obstacles weren't too hard to get through. Hence, it was engaging and I was hooked onto the game.
- This can go for the same for the second level. While it was kind of challenging it was still do able.
