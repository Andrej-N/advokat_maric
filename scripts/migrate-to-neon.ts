import { PrismaClient } from "@prisma/client";

const SOURCE_URL = process.env.SOURCE_DATABASE_URL;
const TARGET_URL = process.env.TARGET_DATABASE_URL;

if (!SOURCE_URL || !TARGET_URL) {
  console.error("Missing SOURCE_DATABASE_URL or TARGET_DATABASE_URL");
  process.exit(1);
}

const source = new PrismaClient({ datasourceUrl: SOURCE_URL });
const target = new PrismaClient({ datasourceUrl: TARGET_URL });

async function main() {
  console.log("Reading from source...");
  const users = await source.user.findMany();
  const posts = await source.post.findMany();
  const translations = await source.postTranslation.findMany();
  const seo = await source.postSeo.findMany();

  console.log(
    `  users: ${users.length}, posts: ${posts.length}, translations: ${translations.length}, seo: ${seo.length}`
  );

  console.log("Writing to target (preserving IDs)...");
  if (users.length) {
    await target.user.createMany({ data: users, skipDuplicates: true });
  }
  if (posts.length) {
    await target.post.createMany({ data: posts, skipDuplicates: true });
  }
  if (translations.length) {
    await target.postTranslation.createMany({
      data: translations,
      skipDuplicates: true,
    });
  }
  if (seo.length) {
    await target.postSeo.createMany({ data: seo, skipDuplicates: true });
  }

  const targetCounts = {
    users: await target.user.count(),
    posts: await target.post.count(),
    translations: await target.postTranslation.count(),
    seo: await target.postSeo.count(),
  };
  console.log("Target counts:", targetCounts);

  const ok =
    targetCounts.users === users.length &&
    targetCounts.posts === posts.length &&
    targetCounts.translations === translations.length &&
    targetCounts.seo === seo.length;

  if (!ok) {
    console.error("Counts mismatch — investigate before swapping env vars.");
    process.exit(1);
  }
  console.log("OK — counts match.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await source.$disconnect();
    await target.$disconnect();
  });
