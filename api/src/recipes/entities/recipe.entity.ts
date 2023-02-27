import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Ingredient)
    @JoinTable()
    ingredients: Ingredient[];

    @ManyToMany(() => Step)
    @JoinTable()
    steps: Step[];
}
