import { renderHook } from '@testing-library/react';
import useDocumentTitle from '../hooks/useDocumentTitle';

test('title is "Comfy Sloth" when no title is provided', () => {
  renderHook(() => useDocumentTitle());
  expect(document.title).toBe('Comfy Sloth');
});

test('title is "Comfy Sloth | <title>" when title is provided', () => {
  renderHook(() => useDocumentTitle('Stock'));
  expect(document.title).toBe('Comfy Sloth | Stock');
});

test('title changes when title provided to the hook changes', () => {
  const { rerender } = renderHook((title = 'Stock') => useDocumentTitle(title));
  expect(document.title).toBe('Comfy Sloth | Stock');
  rerender('Item');
  expect(document.title).toBe('Comfy Sloth | Item');
});