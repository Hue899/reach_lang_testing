'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Admin', {
  });
  const U = API('Writer', {
    f: Fun([], Null),
  });
  init();
  A.publish();

  U.f.interact.out([], null);

  commit();
  exit();
});
