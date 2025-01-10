"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function deleteClock(id: string, userId: string) {
  console.log("DELETING");
  await prisma.clocks.delete({
    where: {
      id: id,
    },
  });
}

// Client-side edit clock save function
export async function updateClockFromEdit(clock: any) {
  // Find the current clock
  const { id, name, lastSessionTime, todaySessionTime, thisWeekTime, allTime } =
    clock;

  await prisma.clocks.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      lastSessionTime: lastSessionTime,
      todaySessionTime: todaySessionTime,
      thisWeekTime: thisWeekTime,
      allTime: allTime,
      editing: false,
    },
  });
}

export async function updateClockFromPunchOut(clock: any) {
  // Find the current clock
  const { id, name } = clock;
  let { lastSessionTime, todaySessionTime, thisWeekTime, allTime } = clock;

  const updatedClock = await prisma.clocks.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      lastSessionTime: lastSessionTime,
      todaySessionTime: todaySessionTime,
      thisWeekTime: thisWeekTime,
      allTime: allTime,
    },
  });

  await revalidatePath(`/clocks/${clock.userId}`);
}

export async function addClock(userId) {
  try {
    await prisma.clocks.create({
      data: {
        name: "New Clock",
        userId: userId,
        editing: false,
        lastSessionTime: 0,
        todaySessionTime: 0,
        thisWeekTime: 0,
        allTime: 0,
      },
    });
    revalidatePath(`/clocks/${userId}`);
    return {message: "Added clock successfully"}
  } catch {
    return { message: "Failed to Add clock" };
  }
}

export async function updateThemePreference(userId: string, newTheme: string ) {
  const updatedUser = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      theme_preference: newTheme,
    }
  })
}

export async function getUserInfo(userId: string) {
  return await prisma.users.findUnique({
    where: {
      id: userId
    }
  })
}

// For client-side login page
export async function authenticateUser(formData) {
  const { username, password } = formData;
  const user = await prisma.users.findUnique({
    where: {
      username: username,
      password: password,
    },
  });
  setTimeout(() => {
    console.log("STUFF")
    return user;
  }, 1000)
}

// For client-side create-user page
export async function createNewUser(formData) {
  const { username, password } = formData;
  const userExists = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  if (userExists) {
    return null;
  } else {
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password,
      },
    });

    await addClock(user.id);

    return user.id;
  }
}
