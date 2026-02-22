/**
 * Library service for managing library documents
 */

import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';

// Cache duration in seconds
const CACHE_DURATION = 60; // 1 minute

export interface LibraryDocumentData {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string | null;
  icon?: string | null;
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
    relatedConcepts?: string[];
    furtherReading?: string[];
  };
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LibraryDocumentCreateInput {
  slug: string;
  title: string;
  description: string;
  category?: string;
  icon?: string;
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
    relatedConcepts?: string[];
    furtherReading?: string[];
  };
  sortOrder?: number;
  isActive?: boolean;
}

export interface LibraryDocumentUpdateInput {
  slug?: string;
  title?: string;
  description?: string;
  category?: string | null;
  icon?: string | null;
  content?: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
    relatedConcepts?: string[];
    furtherReading?: string[];
  };
  sortOrder?: number;
  isActive?: boolean;
}

// ============================================================
// Get Functions
// ============================================================

async function getDocumentsInternal(
  search?: string,
  category?: string
): Promise<LibraryDocumentData[]> {
  const where: any = { isActive: true };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (category) {
    where.category = category;
  }

  const documents = await prisma.libraryDocument.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
  });

  return documents.map((doc) => ({
    ...doc,
    content: doc.content as LibraryDocumentData['content'],
  }));
}

// Cached version
export const getDocuments = unstable_cache(
  async (search?: string, category?: string) => getDocumentsInternal(search, category),
  ['library-documents'],
  { revalidate: CACHE_DURATION }
);

async function getDocumentByIdInternal(id: string): Promise<LibraryDocumentData | null> {
  const document = await prisma.libraryDocument.findUnique({
    where: { id },
  });

  if (!document) return null;

  return {
    ...document,
    content: document.content as LibraryDocumentData['content'],
  };
}

// Cached version
export const getDocumentById = unstable_cache(
  async (id: string) => getDocumentByIdInternal(id),
  ['library-document-by-id'],
  { revalidate: CACHE_DURATION }
);

async function getDocumentBySlugInternal(slug: string): Promise<LibraryDocumentData | null> {
  const document = await prisma.libraryDocument.findUnique({
    where: { slug },
  });

  if (!document) return null;

  return {
    ...document,
    content: document.content as LibraryDocumentData['content'],
  };
}

// Cached version
export const getDocumentBySlug = unstable_cache(
  async (slug: string) => getDocumentBySlugInternal(slug),
  ['library-document-by-slug'],
  { revalidate: CACHE_DURATION }
);

// Get unique categories (for filter dropdown)
export async function getCategories(): Promise<string[]> {
  const documents = await prisma.libraryDocument.findMany({
    where: {
      isActive: true,
      category: { not: null },
    },
    select: { category: true },
    distinct: ['category'],
  });

  return documents
    .map((doc) => doc.category)
    .filter((cat): cat is string => cat !== null)
    .sort();
}

// ============================================================
// Mutation Functions (No caching)
// ============================================================

export async function createDocument(
  data: LibraryDocumentCreateInput
): Promise<LibraryDocumentData> {
  const document = await prisma.libraryDocument.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      icon: data.icon,
      content: data.content as any,
      sortOrder: data.sortOrder ?? 0,
      isActive: data.isActive ?? true,
    },
  });

  return {
    ...document,
    content: document.content as LibraryDocumentData['content'],
  };
}

export async function updateDocument(
  id: string,
  data: LibraryDocumentUpdateInput
): Promise<LibraryDocumentData> {
  const updateData: any = {};

  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.icon !== undefined) updateData.icon = data.icon;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  const document = await prisma.libraryDocument.update({
    where: { id },
    data: updateData,
  });

  return {
    ...document,
    content: document.content as LibraryDocumentData['content'],
  };
}

export async function deleteDocument(id: string): Promise<void> {
  await prisma.libraryDocument.delete({
    where: { id },
  });
}
