import { promisify } from 'util';
import { PrismaService } from 'src/prisma/prisma.service';
import { exec } from 'child_process';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { ConfigService } from '@nestjs/config';

const execAsync = promisify(exec);

const dbConfig = {
    POSTGRES_DB: 'test',
    POSTGRES_PORT: 5432,
    POSTGRES_USER: 'username',
    POSTGRES_PASSWORD: 'password',
    POSTGRES_HOST: 'localhost',
};

async function setupTestContainer() {
    const container = await new PostgreSqlContainer()
        .withDatabase(dbConfig.POSTGRES_DB)
        .withUsername(dbConfig.POSTGRES_USER)
        .withPassword(dbConfig.POSTGRES_PASSWORD)
        .withExposedPorts(dbConfig.POSTGRES_PORT)
        .start();

    const connectionConfig = {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
    };

    return container;
}

export async function setupPrismaService() {
    const container = await setupTestContainer();
    const databaseUrl = container.getConnectionUri();
    const result = await execAsync(
        `set DATABASE_URL=${databaseUrl} && set POSTGRES_DB=${dbConfig.POSTGRES_HOST} && npx prisma migrate deploy`,
    );
    const configService = new ConfigService();
    configService.get = jest.fn().mockReturnValue(databaseUrl);
    const prisma = new PrismaService(configService);

    return prisma;
}
