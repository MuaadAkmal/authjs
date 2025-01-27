"use server";

export async function getDate() {
  return new Date().toISOString();
}
