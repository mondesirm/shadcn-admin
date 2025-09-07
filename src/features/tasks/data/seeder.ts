import { faker } from '@faker-js/faker'
import { labels, statuses, priorities } from './enums'
import { type Task } from './schema'

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const taskSeeder = faker.helpers.multiple<Task>(
  (_, i) => ({
    id: i + 1,
    title: faker.lorem.sentence({ min: 5, max: 15 }),
    label: faker.helpers.arrayElement(labels.map((_) => _.value)),
    status: faker.helpers.arrayElement(statuses.map((_) => _.value)),
    priority: faker.helpers.arrayElement(priorities.map((_) => _.value)),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    assignee: faker.person.fullName(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    dueDate: faker.date.future(),
  }),
  { count: 100 }
)
